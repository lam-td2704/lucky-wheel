*What are the differences between props and state?*

- Components receive data from outside with props, whereas they can create and manage their own data with state
- `Props are used to pass data, whereas state is for managing data`
- `Data from props is read-only, and cannot be modified by a component that is receiving it from outside`
- `State data can be modified by its own component, but is private (cannot be accessed from outside)`
- Props can only be passed from parent component to child (unidirectional flow)
- Modifying state should happen with the `setState()` method

////