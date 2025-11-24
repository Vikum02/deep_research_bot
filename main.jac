
import from byllm.lib { Model }

glob llm = Model(
    model_name="gemini/gemini-2.0-flash",
    temperature=0.3,
    max_tokens=800,
);

def chat_with_user(query: str, detail_level: str = "short") -> str by llm();

walker agent {
    has message: str;

    can ask with `root entry{
        result = chat_with_user(self.message);
        report result;
    }
}

