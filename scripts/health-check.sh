#!/bin/bash
# =============================================================================
# GOVCON SHOP HEALTH CHECK
# =============================================================================
# Runs daily to verify all product pages and links are working.
# Sends Slack notification if any issues are found.
#
# Usage: ./scripts/health-check.sh
# Cron:  0 8 * * * cd /Users/ericcoffie/govcon-shop && ./scripts/health-check.sh
# =============================================================================

set -e

# Configuration
BASE_URL="https://shop.govcongiants.org"
SLACK_WEBHOOK="${SLACK_HEALTH_WEBHOOK_URL:-}"
LOG_FILE="/Users/ericcoffie/govcon-shop/scripts/health-check.log"
REPORT_FILE="/Users/ericcoffie/govcon-shop/scripts/health-report.json"

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Initialize counters
TOTAL=0
PASSED=0
FAILED=0
WARNINGS=0
ISSUES=()

# Timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
echo "========================================"
echo "GovCon Shop Health Check"
echo "Started: $TIMESTAMP"
echo "========================================"
echo ""

# Function to check a URL
check_url() {
  local name="$1"
  local path="$2"
  local expected_status="${3:-200}"
  local url="${BASE_URL}${path}"

  TOTAL=$((TOTAL + 1))

  # Get HTTP status and response time
  response=$(curl -s -o /dev/null -w "%{http_code}|%{time_total}" "$url" --max-time 10 2>/dev/null || echo "000|0")
  http_status=$(echo "$response" | cut -d'|' -f1)
  response_time=$(echo "$response" | cut -d'|' -f2)

  # Check status
  if [ "$http_status" = "$expected_status" ]; then
    PASSED=$((PASSED + 1))
    printf "${GREEN}✅${NC} %-40s HTTP %s (%.2fs)\n" "$name" "$http_status" "$response_time"
  elif [ "$http_status" = "307" ] || [ "$http_status" = "308" ]; then
    # Redirects might be intentional
    WARNINGS=$((WARNINGS + 1))
    printf "${YELLOW}⚠️${NC}  %-40s HTTP %s (redirect)\n" "$name" "$http_status"
    ISSUES+=("WARNING: $name ($path) returns HTTP $http_status (redirect)")
  else
    FAILED=$((FAILED + 1))
    printf "${RED}❌${NC} %-40s HTTP %s\n" "$name" "$http_status"
    ISSUES+=("FAILED: $name ($path) returns HTTP $http_status (expected $expected_status)")
  fi
}

# Function to check internal links on a page
check_page_links() {
  local page_name="$1"
  local page_path="$2"
  local url="${BASE_URL}${page_path}"

  echo ""
  echo "Checking links on $page_name..."

  # Fetch page and extract internal links
  links=$(curl -s "$url" --max-time 15 2>/dev/null | \
    grep -oE 'href="(/[^"]*)"' | \
    sed 's/href="//g; s/"//g' | \
    grep -v '#' | \
    grep -v 'mailto:' | \
    grep -v 'http' | \
    sort -u)

  link_count=0
  for link in $links; do
    # Skip certain paths
    if [[ "$link" == "/api/"* ]] || [[ "$link" == "/_next/"* ]]; then
      continue
    fi

    link_count=$((link_count + 1))
    check_url "  → $link" "$link"
  done

  echo "  Found $link_count internal links"
}

echo "=== CRITICAL PRODUCT PAGES ==="
echo ""

# Premium Products (must return 200)
check_url "Federal Market Assassin" "/market-assassin"
check_url "Content Reaper" "/content-reaper"
check_url "Contractor Database (Product)" "/contractor-database-product"
check_url "Recompete Tracker" "/expiring-contracts"

echo ""
echo "=== FREE TOOLS ==="
echo ""

# Free Tools
check_url "Opportunity Hunter" "/opportunity-hunter"
check_url "SBLO Contact List" "/sblo-directory"
check_url "December Spend Forecast" "/december-spend"
check_url "75+ AI Prompts" "/ai-prompts"
check_url "2026 Action Plan" "/action-plan-2026"
check_url "Guides & Templates" "/guides-templates"
check_url "Tier-2 Supplier List" "/tier2-directory"
check_url "Expiring Contracts CSV" "/expiring-contracts-csv"
check_url "Tribal Contractor List" "/tribal-list"

echo ""
echo "=== BUNDLES ==="
echo ""

check_url "Starter Bundle" "/bundles/starter"
check_url "Pro Bundle" "/bundles/pro"
check_url "Ultimate Bundle" "/bundles/ultimate"

echo ""
echo "=== CORE PAGES ==="
echo ""

check_url "Homepage" "/"
check_url "About" "/about"
check_url "Blog" "/blog"
check_url "Store" "/store"
check_url "Free Resources" "/free-resources"
check_url "Activate License" "/activate"
check_url "Privacy Policy" "/privacy-policy"
check_url "Terms of Service" "/terms-of-service"

echo ""
echo "=== ACCESS-GATED PAGES (expect redirects) ==="
echo ""

# These should redirect - that's correct behavior
check_url "Contractor Database (Gated)" "/contractor-database" "307"
check_url "Market Assassin (Gated)" "/federal-market-assassin" "307"

echo ""
echo "=== API ENDPOINTS ==="
echo ""

# Check critical API endpoints
check_url "API: Health" "/api/health" "200"

echo ""
echo "=== CHECKING HOMEPAGE LINKS ==="
check_page_links "Homepage" "/"

echo ""
echo "========================================"
echo "SUMMARY"
echo "========================================"
echo ""
echo "Total Checks: $TOTAL"
printf "${GREEN}Passed: $PASSED${NC}\n"
printf "${YELLOW}Warnings: $WARNINGS${NC}\n"
printf "${RED}Failed: $FAILED${NC}\n"
echo ""

# Generate JSON report
cat > "$REPORT_FILE" << EOF
{
  "timestamp": "$TIMESTAMP",
  "base_url": "$BASE_URL",
  "total": $TOTAL,
  "passed": $PASSED,
  "warnings": $WARNINGS,
  "failed": $FAILED,
  "issues": [
$(printf '    "%s"' "${ISSUES[0]:-}")
$(for issue in "${ISSUES[@]:1}"; do printf ',\n    "%s"' "$issue"; done)
  ]
}
EOF

# Log results
echo "[$TIMESTAMP] Total: $TOTAL, Passed: $PASSED, Warnings: $WARNINGS, Failed: $FAILED" >> "$LOG_FILE"

# Send Slack notification if there are failures
if [ $FAILED -gt 0 ] && [ -n "$SLACK_WEBHOOK" ]; then
  echo "Sending Slack alert..."

  issue_text=""
  for issue in "${ISSUES[@]}"; do
    if [[ "$issue" == "FAILED:"* ]]; then
      issue_text="${issue_text}• ${issue}\n"
    fi
  done

  curl -s -X POST "$SLACK_WEBHOOK" \
    -H "Content-Type: application/json" \
    -d "{
      \"text\": \"🚨 *GovCon Shop Health Check Failed*\",
      \"blocks\": [
        {
          \"type\": \"header\",
          \"text\": {
            \"type\": \"plain_text\",
            \"text\": \"🚨 GovCon Shop Health Check Failed\"
          }
        },
        {
          \"type\": \"section\",
          \"fields\": [
            {\"type\": \"mrkdwn\", \"text\": \"*Passed:* $PASSED\"},
            {\"type\": \"mrkdwn\", \"text\": \"*Failed:* $FAILED\"},
            {\"type\": \"mrkdwn\", \"text\": \"*Warnings:* $WARNINGS\"},
            {\"type\": \"mrkdwn\", \"text\": \"*Time:* $TIMESTAMP\"}
          ]
        },
        {
          \"type\": \"section\",
          \"text\": {
            \"type\": \"mrkdwn\",
            \"text\": \"*Issues Found:*\n${issue_text}\"
          }
        },
        {
          \"type\": \"actions\",
          \"elements\": [
            {
              \"type\": \"button\",
              \"text\": {\"type\": \"plain_text\", \"text\": \"View Shop\"},
              \"url\": \"$BASE_URL\"
            }
          ]
        }
      ]
    }" > /dev/null

  echo "Slack alert sent!"
fi

# Exit with error if failures
if [ $FAILED -gt 0 ]; then
  echo ""
  echo "❌ Health check completed with $FAILED failures"
  exit 1
else
  echo ""
  echo "✅ Health check passed!"
  exit 0
fi
