# Open Questions and Assumptions

## No Hard Blockers Found
The provided PRD is sufficient to proceed with documentation and initial implementation planning.

## Assumptions Used
1. History persistence is optional in V1 and can start as frontend-managed state
2. Backend remains mandatory for canonical calculation execution because Node.js backend is part of required deliverables
3. Scientific layout can collapse or reflow for smaller screens to maintain responsiveness
4. Precision handling will follow JavaScript numeric behavior unless a higher-precision requirement is added later

## Suggested Enhancements (Not blockers)
- Add copy-to-clipboard for result in a later iteration
- Add theme switching after core functionality is stable
- Consider localStorage persistence before adding full DB persistence
