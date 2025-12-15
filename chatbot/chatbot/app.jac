import from byllm.lib { Model }
import from tavily { TavilyClient }
import os;

glob llm = Model(
    model_name="mistral/mistral-large-latest",
    temperature=0.7,
    max_tokens=800
);

glob tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"));

def web_search(query: str) -> str {
    print("🔥 WEB SEARCH:", query);
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
        print("✓ Found:", len(snippets), "results");
        return combined;
    } else {
        return "No results found.";
    }
}

"""Generate 3-5 clarifying questions about the user's research topic.

Format: Q1:, Q2:, Q3:, etc.

Example:
Input: "house pricing in New Zealand"
Output:
Q1: Current prices or historical trends?
Q2: Which specific regions?
Q3: Purpose: buying, selling, or researching?
Q4: What price range?"""
def generate_clarification_questions(user_input: str) -> str by llm();

"""Create 5 research questions using the topic and user's answers.

Format:
TOPIC: [clear name]
Q1: [question]
Q2: [question]
Q3: [question]
Q4: [question]
Q5: [question] """
def generate_targeted_research_plan(topic: str, user_answers: str) -> str by llm();

walker research_bot {
    has userinput: str;
    has formatted_history: str;

    can process with `root entry {
        
        let is_clarification_response = " - " in self.userinput;
        
        if is_clarification_response {
            # USER ANSWERED, DO RESEARCH
            
            parts = self.userinput.split(" - ");
            original_topic = parts[0].strip();
            user_answers = parts[1].strip();
         
            plan_text = generate_targeted_research_plan(original_topic, user_answers);
            
            # Parse plan
            lines = plan_text.split("\n");
            questions = [];
            main_topic = original_topic;
            
            for line in lines {
                line_stripped = line.strip();
                
                if line_stripped.startswith("TOPIC:") {
                    main_topic = line_stripped.replace("TOPIC:", "").strip();
                }
                
                if line_stripped.startswith("Q1:") {
                    questions.append(line_stripped.replace("Q1:", "").strip());
                } elif line_stripped.startswith("Q2:") {
                    questions.append(line_stripped.replace("Q2:", "").strip());
                } elif line_stripped.startswith("Q3:") {
                    questions.append(line_stripped.replace("Q3:", "").strip());
                } elif line_stripped.startswith("Q4:") {
                    questions.append(line_stripped.replace("Q4:", "").strip());
                } elif line_stripped.startswith("Q5:") {
                    questions.append(line_stripped.replace("Q5:", "").strip());
                }
            }

            
            # Execute searches
            all_findings = [];
            search_num = 0;
            
            for question in questions {
                search_num = search_num + 1;
                print("Search", search_num, ":", question);
                
                search_result = web_search(question);
                
                finding = {
                    "num": search_num,
                    "question": question,
                    "content": search_result
                };
                all_findings.append(finding);
                print("✓ Complete");
                print("");
            }
         
            print("✅ ALL SEARCHES COMPLETE:", len(all_findings));
            
            # Format response
            response = "Deep Research Complete!\n\n";
            response = response + "Topic: " + main_topic + "\n\n";
            response = response + "Based on your answers " + str(len(all_findings)) + " targeted searches:\n\n";
            response = response + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
            
            for finding in all_findings {
                response = response + "📍 Search " + str(finding["num"]) + ": " + finding["question"] + "\n\n";
                response = response + finding["content"] + "\n\n";
                response = response + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
            }
            
            response = response + "• Research Summary:\n";
            response = response + "• Topic: " + main_topic + "\n";
            response = response + "• Targeted searches: " + str(len(all_findings)) + "\n";
            response = response + "• Personalized to your needs\n";
            
            report response;
            
        } else {
            # ASK CLARIFICATION QUESTIONS
            print("📋 Generating clarification questions...");
            
            clarification_qs = generate_clarification_questions(self.userinput);
            
            # Format response with clarification questions
            response = "🔍 **To provide the most relevant research, I need to understand better:**\n\n";
            response = response + clarification_qs + "\n\n";
            response = response + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
            response = response + "📝 Please answer these questions so I can conduct targeted research for you?";
            
            report response;
        }
    }
}