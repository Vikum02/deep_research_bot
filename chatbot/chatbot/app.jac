import from byllm.lib { Model }

glob llm = Model(
    model_name="gemini/gemini-2.0-flash",
    temperature=0.4,
    max_tokens=300
);

def ask_llm(current_question: str, conversation_history: str) -> str by llm();

walker chat_agent {
    has userinput: str;
    has formatted_history: str;

    can chat with `root entry {
        response = ask_llm(self.userinput, self.formatted_history);
        report response;
    }
}

