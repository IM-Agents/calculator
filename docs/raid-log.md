# RAID Log

## Risks
1. **Scientific parser complexity**
   - Impact: Incorrect or inconsistent calculations
   - Mitigation: Build controlled tokenization/parsing rules and unit-test edge cases thoroughly

2. **Floating-point precision quirks**
   - Impact: Display values may appear surprising for some operations
   - Mitigation: Add controlled rounding/formatting rules for display output

3. **Ambiguous operator behavior**
   - Impact: Users may not understand `%`, `±`, or exponent precedence
   - Mitigation: Define behavior clearly in implementation and test cases

## Assumptions
1. Initial history persistence can remain in-memory
2. Backend evaluation is preferred even if some client-side validation exists
3. JavaScript `Math` precision is acceptable for V1 scientific scope

## Issues / Unknowns
1. No Figma URL was provided, so visual design guidance is based on PRD only
2. No comment person was provided
3. Branch requested (`test_calcad`) does not currently exist upstream and may need to be created from the existing calculator branch

## Dependencies
- React frontend setup
- Node.js/Express backend setup
- GitHub repository access for push
