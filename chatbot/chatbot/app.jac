import from byllm.lib { Model }
import from tavily { TavilyClient }
import os;

glob llm = Model(
    model_name="mistral/mistral-large-latest",
    temperature=0.7,
    max_tokens=1500
);

glob tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"));

def web_search(query: str) -> str {
    search_results = tavily_client.search(query, max_results=3);
    results_list = search_results.get("results", []);
    snippets = [];
    
    for r in results_list {
        if "content" in r {
            snippets.append(r["content"]);
        }
    }
    
    return "\n\n".join(snippets) if snippets else "No results found.";
}

# CLARIFICATION
"""Generate 3-5 clarifying questions about the user's research topic.
Format: Q1:, Q2:, Q3:, etc."""
def generate_clarification_questions(user_input: str) -> str by llm();

# RESEARCH PLANNING
"""Create 5 targeted research questions.
Format:
TOPIC: [name]
Q1: [question]
Q2: [question]
Q3: [question]
Q4: [question]
Q5: [question]"""
def generate_targeted_research_plan(topic: str, user_answers: str) -> str by llm();

# SYNTHESIS
"""Analyze all search results and extract key insights.
Output format:
INSIGHT: [main insight 1]
INSIGHT: [main insight 2]
INSIGHT: [main insight 3]

THEME: [theme name]
- [detail]
- [detail]

THEME: [theme name]
- [detail]
- [detail]

Keep insights clear and remove duplicate information."""
def synthesize_research(topic: str, all_search_data: str) -> str by llm();

# REPORT GENERATION
"""Create a professional research report from synthesis.
Structure:
SUMMARY: [2-3 sentence executive summary]

FINDINGS:
- [key finding 1]
- [key finding 2]
- [key finding 3]

SECTION: [theme name]
[detailed information about this theme]

SECTION: [theme name]
[detailed information about this theme]

Keep it clear, well-organized, and actionable."""
def generate_final_report(topic: str, synthesis: str, search_count: int) -> str by llm();

# RESEARCH BOT WALKER
walker research_bot {
    has userinput: str;
    has formatted_history: str;

    can process with `root entry {
        let is_clarification_response = " - " in self.userinput;
        
        if is_clarification_response {
            # PHASE 2: DO RESEARCH
            
            parts = self.userinput.split(" - ");
            original_topic = parts[0].strip();
            user_answers = parts[1].strip();
         
            plan_text = generate_targeted_research_plan(original_topic, user_answers);
            
            # Parse questions
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
                search_result = web_search(question);
                
                finding = {
                    "num": search_num,
                    "question": question,
                    "content": search_result
                };
                all_findings.append(finding);
            }
          
            # PHASE 3: SYNTHESIZE
            
            # Combine all search data
            combined_data = "Research Topic: " + main_topic + "\n";
            combined_data = combined_data + "User Context: " + user_answers + "\n\n";
            
            for finding in all_findings {
                combined_data = combined_data + "Question " + str(finding["num"]) + ": " + finding["question"] + "\n";
                combined_data = combined_data + "Results: " + finding["content"] + "\n\n";
            }
            
            # Synthesize findings
            synthesis = synthesize_research(main_topic, combined_data);

            # PHASE 4: GENERATE REPORT
            
            report_text = generate_final_report(main_topic, synthesis, len(all_findings));
            
            # Parse and format report
            report_lines = report_text.split("\n");
            formatted_report = "🔬 Deep Research Report\n\n";
            formatted_report = formatted_report + "Topic: " + main_topic + "\n\n";
            formatted_report = formatted_report + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
            
            current_section = "";
            
            for line in report_lines {
                line_stripped = line.strip();
                
                if line_stripped.startswith("SUMMARY:") {
                    formatted_report = formatted_report + "📊 Executive Summary\n\n";
                    formatted_report = formatted_report + line_stripped.replace("SUMMARY:", "").strip() + "\n\n";
                    formatted_report = formatted_report + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
                } elif line_stripped.startswith("FINDINGS:") {
                    formatted_report = formatted_report + "🔍 Key Findings\n\n";
                } elif line_stripped.startswith("SECTION:") {
                    if current_section {
                        formatted_report = formatted_report + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
                    }
                    section_name = line_stripped.replace("SECTION:", "").strip();
                    formatted_report = formatted_report + "📈 " + section_name + "**\n\n";
                    current_section = section_name;
                } elif line_stripped.startswith("•") or line_stripped.startswith("-") {
                    formatted_report = formatted_report + line_stripped + "\n";
                } elif len(line_stripped) > 0 {
                    formatted_report = formatted_report + line_stripped + "\n";
                }
            }

            formatted_report = formatted_report + "📚 Research Summary\n";
            formatted_report = formatted_report + "• Searches conducted: " + str(len(all_findings)) + "\n";
            formatted_report = formatted_report + "• Personalized to your needs\n";
            
            report formatted_report;
            
        } else {
            # PHASE 1: ASK CLARIFICATION
            
            clarification_qs = generate_clarification_questions(self.userinput);
            
            response = "🔍 To provide the most relevant research, I need to understand better:\n\n";
            response = response + clarification_qs + "\n\n";
            response = response + "📝 Please answer these questions so I can conduct targeted research for you?";
            
            report response;
        }
    }
}