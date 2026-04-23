# Team Collaboration Grandfathering — Edge Cases

**Policy:** All team members invited during Early Adopter Program stay free permanently, even if admin stays on Free plan after pricing launches. New invitations after pricing launches count toward seat limits.

---

## Critical Edge Cases to Decide

### 1. Remove and Re-invite
**Scenario:** Admin invites Alice during early access (grandfathered). Later removes her. After pricing launches, tries to re-invite her, but they're at max member seats.

**Decision:** Feature gate enforces seat limit. If at max seats, cannot re-add. They must remove another member first or upgrade plan.

**Implementation:** Seat availability check happens at invite-time. If current non-grandfathered members >= plan.max_seats, reject invite with message about seat limit.

---

### 2. Seat Overflow (Free Plan + Many Grandfathered Members)
**Scenario:** Admin on Free plan invites 5 members during early access (all grandfathered). After pricing launches, Free plan only allows 0 additional seats.

**Decision needed:**
- Can they keep 5 members?
- Can they add a 6th?

**Recommendation:** Grandfathered members keep access (they don't count against limit). But no new invitations until they upgrade.

**Implementation:** Seat limit check: `available_seats = plan.max_seats - new_non_grandfathered_members`. Grandfathered members don't factor into this calculation.

---

### 3. Invitation Not Accepted Before Pricing Launch
**Scenario:** Admin invites Bob during early access. Bob doesn't accept until after pricing launches.

**Decision:** Acceptance must happen before pricing launch. If Bob accepts after pricing launches, he counts as a paid member against seat limit.

**Implementation:** When processing invitation acceptance, check if `acceptedAt >= pricing_launch_date`. If so, validate against seat limit. If not enough seats, reject acceptance and prompt admin to upgrade or remove a member. Acceptance link should include messaging about this deadline.

---

### 4. Ownership Transfer
**Status:** N/A — Village does not support ownership transfer. Orgs are tied to the original admin account.

---

### 5. Multiple Organizations
**Scenario:** Alice is admin of Organization A (invites 2 grandfathered members). Also a member of Organization B (also invited during early access, so grandfathered).

**Decision needed:**
- Are grandfathering policies per-organization?
- Does membership in Org B count against Org A's seat limit?

**Recommendation:** Grandfathering is completely per-organization. Each org tracks its own members and grandfathering independently.

**Implementation:** Seat limits and grandfathering are org-scoped queries.

---

### 6. Admin Deletes Account and Recreates
**Scenario:** Alice has an org with 3 grandfathered members. Deletes her account. Creates new account with same email.

**Decision needed:**
- Does the new account get the old organization back?
- Do members stay grandfathered?

**Recommendation:** If account is deleted, the organization should be deleted too (or orphaned). New account = new organization. Members do not transfer.

**Implementation:** Account deletion cascades to org deletion. New account starts fresh.

---

### 7. Plan Upgrade During Early Access
**Scenario:** Admin is on Free plan, invites 2 members (grandfathered). Upgrades to Individual plan (which allows 1 seat) while in early access.

**Decision needed:**
- Do the 2 early-access members stay free when they move to a plan that only allows 1 seat?

**Recommendation:** Yes, grandfathering applies regardless of current plan. Early access members stay free. The Individual plan's 1 seat limit applies only to new invitations after pricing launches.

**Implementation:** Seat availability check happens at new-invitation time, not on plan change.

---

### 8. Pricing Launch Trigger (No Fixed Date)
**Scenario:** Pricing launches when Clerk ships discount codes and add-ons (e.g., $5/month Village Live). No fixed date planned.

**Decision:** Use a feature flag/config toggle to mark when pricing launches. When toggled:
- All existing members stay grandfathered
- Invitations before toggle = grandfathered
- Invitations after toggle = paid seat (subject to limit)
- Acceptances after toggle must pass seat limit check

**Implementation:** Create `pricingLaunched` boolean flag in config. When false (early access), all invites grandfathered. When true (pricing live), enforce seat limits and grandfathering logic.

---

### 9. Batch Invitations (CSV or API)
**Scenario:** Admin uses batch invite (if implemented) to invite 10 people at once, right at pricing launch.

**Decision needed:**
- Are all 10 grandfathered if they were invited before cutoff?
- Or does the batch process get split?

**Recommendation:** Process all as submitted. If all invitations are created before cutoff, all are grandfathered.

**Implementation:** Batch invitations should use the same `invitedAt` timestamp logic. All in batch processed together.

---

### 10. Seat Limit Edge Case: What if organization already exceeds planned limit?
**Scenario:** Admin on Free plan (0 seats after pricing) with 8 grandfathered members invites a 9th.

**Decision needed:**
- Is the 9th invitation allowed?

**Recommendation:** Yes. Grandfathered members don't count against the limit. If they're all grandfathered, they all stay.

**Implementation:** The seat check only counts non-grandfathered members.

---

## Implementation Checklist

- [ ] Add `invitedAt` timestamp to team_members table
- [ ] Add `pricingLaunched` boolean flag to config (default: false for early access)
- [ ] Create function to check if member is grandfathered: `isGrandfathered(invitedAt, pricingLaunched)`
- [ ] Update seat availability calculation to exclude grandfathered members
- [ ] Update invite logic to:
  - If `!pricingLaunched`: allow unlimited invites, all grandfathered
  - If `pricingLaunched`: enforce seat limit for new invites, grandfathered members don't count
- [ ] Update invitation acceptance logic to:
  - Check `acceptedAt` timestamp if `pricingLaunched` is true
  - If acceptance after launch date, validate seat availability
  - Show messaging about acceptance deadline in email/link
- [ ] Update seat enforcement on invite and acceptance
- [ ] Migrate all current team members to have `invitedAt` set to early access phase (before pricing launch)
- [ ] Add UI messaging explaining grandfathering when user views team members
- [ ] Add admin messaging and warnings when:
  - Pricing launches (show which members are grandfathered)
  - They approach seat limit with non-grandfathered members
  - They try to add member when at limit
- [ ] Document edge cases in app UI (help articles, tooltips)
- [ ] Plan how to gracefully communicate to admins when `pricingLaunched` flag is toggled
