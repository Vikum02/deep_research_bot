import from byllm.lib { Model }
import from tavily { TavilyClient }
import os;

glob llm = Model(
    model_name="mistral/mistral-large-latest",
    temperature=0.7,
    max_tokens=800
);

# sets up a reusable client for live web search.
glob tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"));

# A tool function that the LLM can call through the ReAct framework to perform web searches.
def web_search(query: str) -> str {
    print("🔥 WEB SEARCH TRIGGERED for query:", query);
    search_results = tavily_client.search(query, max_results=3);
    
    results_list = search_results.get("results", []);
    snippets = [];
    
    for r in results_list {
        if "content" in r {
            snippets.append(r["content"]);
        }
    }
    
    if snippets {
        combined = "\n\n".join(snippets);
        print("Found results:", len(snippets));
        return combined;
    } else {
        return "No search results found.";
    }
}

"""You are a helpful AI assistant with access to web search.

DECISION LOGIC:

1. SEARCH THE WEB for current/real-time information:
   - "What's the weather today?" → Use web_search
   - "Latest news" → Use web_search
   - "Current price of X" → Use web_search
   
2. ANSWER DIRECTLY for general knowledge:
   - "What is photosynthesis?" → Answer from knowledge
   - "Explain Python loops" → Answer from knowledge
   
3. ASK FOR CLARIFICATION if ambiguous:
   - "Python" → Ask "Programming or reptile?"
   - "weather" → Ask "Which city?"

When conversation history shows you asked for clarification, the user is responding - provide a complete answer.

When using web_search, synthesize results naturally. Be conversational and accurate."""
def intelligent_chat(user_input: str, conversation_history: str) -> str by llm(
    method = "ReAct",
    tools = ([web_search])
);

walker chat_bot {
    has userinput: str;
    has formatted_history: str;

    can process with `root entry {
        response = intelligent_chat(self.userinput, self.formatted_history);
        report response;
    }
}