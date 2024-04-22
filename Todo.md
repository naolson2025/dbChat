### Model Features
- [x] Feed SQLiteErrors back to the LLM
- [x] Prevent LLM from running any `DROP` or `DELETE` commands
- [x] Give it a function to get the DB Table columns
- [x] Give it a function to make general db queries
- [ ] Create chat history from scratch so only the user vs model messages are categorized correctly
- [ ] Create a tool to have the LLM return data in a table format
- [x] Each client should have their own chat history (currently only one chat history is kept)
- [x] keeps conversation history temporarily

### App Features
- [x] websocket connection to chat with LLM
- [ ] improve UI design
- [ ] auth & session management
- [ ] save chat history to DB
- [ ] serve SPA
- [ ] production build
- [ ] docker container
- [ ] deploy

### random ideas
- need a tailwind ui kit
  - https://daisyui.com/
  - https://preline.co/docs/index.html
  - has a lot of free stuff & chat bubbles