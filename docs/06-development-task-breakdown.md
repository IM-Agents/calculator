# Development Task Breakdown

## Epic 1: Project Setup
1. Initialize React frontend and Node.js backend structure
2. Configure clean folder architecture for both apps
3. Set up environment configuration and scripts
4. Add linting/testing baseline with minimal tooling

## Epic 2: Calculation Engine
1. Define supported operators, constants, and functions
2. Build safe parser/evaluator without unsafe `eval`
3. Add angle mode conversion logic for trig functions
4. Add validation for malformed expressions
5. Add error handling for divide-by-zero and negative square root
6. Add unit tests for calculator service

## Epic 3: Frontend Calculator UI
1. Build calculator display component
2. Build button grid for standard and scientific operations
3. Implement operator styling and interactive states
4. Add responsive layout for mobile, tablet, and desktop
5. Add accessible labels and keyboard navigation states

## Epic 4: State and Interaction
1. Implement current expression state
2. Implement memory state and actions
3. Implement history state with cap of 10 entries
4. Implement degree/radian mode toggle
5. Integrate keyboard support
6. Handle backspace, clear, and sign toggle actions

## Epic 5: Frontend-Backend Integration
1. Create API service module in frontend
2. Connect evaluate action to backend endpoint
3. Render result and error messages from API responses
4. Update history after each successful calculation

## Epic 6: Persistence (Optional V1+)
1. Add MySQL table for calculation history
2. Create history API endpoints
3. Add retention rule for latest 10 records only

## Epic 7: Quality Assurance
1. Test all arithmetic and scientific functions
2. Validate edge cases: repeated operators, multiple decimals, empty input, very large numbers
3. Verify keyboard interaction across browsers
4. Verify responsive usability on mobile/tablet/desktop
5. Verify accessibility contrast and focus behavior
