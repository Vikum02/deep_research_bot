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