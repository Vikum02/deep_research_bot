import from backend { chat_with_user }

walker agent {
    has message: str;

    can ask with `root entry{
       result = chat_with_user(self.message);
       report result;
    }
}

obj DeepResearchTool {
 
    def ask(message: str, detail: str = "short") -> str {
        result = chat_with_user(message, detail);
        return result;
    }
}

# with entry {
#     tool = DeepResearchTool();

#     print("Simple Chatbot (Jac + byLLM + Gemini)");
#     print("Type your question and press Enter.");
#     print("Type 'exit' to quit.\n");

#     while True {
#         user_msg = input("You: ");

#         if user_msg == "exit" or user_msg == "quit" {
#             print("Bot: Goodbye! ");
#             break;
#         }

#         reply = tool.ask(user_msg, "short");

#         print("Bot:", reply);
#         print("");  
#     }
# }
