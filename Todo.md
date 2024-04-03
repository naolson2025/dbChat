### Error Handling
- [x] Feed SQLiteErrors back to the LLM

### Guardrails
- [x] Prevent LLM from running any `DROP` or `DELETE` commands

### Tools
- [x] Give it a function to get the DB Table columns

### Features
- [ ] Display query results in a table
- [x] Add chat history
- [x] add prompt loop until I have a front end
- [ ] Fix: Currently there is one global chat this would blend history for all users (maybe use a session id to separate them)

### Frontend
- chat interface
- Should have project summary at the top
- use vite react-ts template to create a static front end
- vite has SSR, but worry about this later

### Backend
- [ ] Add catch all endpoint to serve client side app
- [x] Add endpoint to chat with LLM
- add endpoint auth
- [ ] ws currently all connect to one chat, need to separate them
 