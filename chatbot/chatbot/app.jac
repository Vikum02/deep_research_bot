import from byllm.lib { Model }
import from tavily { TavilyClient }
import os;

# Initialize LLM model
glob llm = Model(
    model_name="mistral/mistral-large-latest",
    temperature=0.7,
    max_tokens=3500
);

# Initialize Tavily search client
glob tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"));

# WEB SEARCH TOOL
def web_search(query: str) -> str {
    # Execute search and get top 3 results
    search_results = tavily_client.search(query, max_results=3);
    results_list = search_results.get("results", []);
    snippets = [];
    
    # Extract content from each result
    for r in results_list {
        if "content" in r {
            snippets.append(r["content"]);
        }
    }
    
    # Combine all snippets with line breaks
    return "\n\n".join(snippets) if snippets else "No results found.";
}

# PHASE 1: CLARIFICATION
"""Generate 3-5 clarifying questions to understand user's research needs.
Returns questions formatted as Q1:, Q2:, Q3: on separate lines."""
def generate_clarification_questions(user_input: str) -> str by llm();

# PHASE 2: RESEARCH PLANNING
"""Create 5 targeted research questions based on topic and user's clarification answers.
Returns TOPIC: [name] followed by Q1: through Q5: with specific searchable questions."""
def generate_targeted_research_plan(topic: str, user_answers: str) -> str by llm();

# MULTI-SEARCH VARIATIONS
"""Generate 2-3 alternative search queries to explore different angles of a question.
Returns V1:, V2:, V3: with related but distinct search queries."""
def generate_search_variations(question: str) -> str by llm();

# PHASE 3 & 4: COMPREHENSIVE MARKDOWN REPORT
"""Create a 2000-2500 word research report in markdown format.

CRITICAL FORMATTING RULES (FOLLOW EXACTLY):
1. Use ONLY ## for ALL section headings (never use ###, ####, or #)
2. Example: ## Executive Summary (NOT ### Executive Summary)
3. Use - for bullet points (with space after dash)
4. Use **text** for bold emphasis
5. Use | for tables with proper alignment
6. Leave blank lines between sections

Required Structure:
## Executive Summary
[2-3 paragraphs summarizing key findings]

## Key Findings
- Finding 1 with specific data
- Finding 2 with specific data
- Finding 3 with specific data

## [Topic Section ]
[200-300 words with data, numbers, dates]

## Recommendations
- Recommendation 1
- Recommendation 2

---

Use specific data, numbers, dates, and examples throughout. End report with --- separator."""
def generate_markdown_report(topic: str, all_search_data: str, search_count: int, user_context: str) -> str by llm();

# RESEARCH BOT WALKER
walker research_bot {
    has userinput: str;
    has formatted_history: str;

    can process with `root entry {
        # Detect if this is a clarification response by checking for delimiter
        let is_clarification_response = " - " in self.userinput;
        
        if is_clarification_response {
            # PHASE 2-4: RESEARCH WITH MULTI-SEARCH
            
            # Split input to extract original topic and user's answers
            parts = self.userinput.split(" - ");
            original_topic = parts[0].strip();
            user_answers = parts[1].strip();
         
            # Generate research plan with 5 targeted questions
            plan_text = generate_targeted_research_plan(original_topic, user_answers);
            
            # Parse questions from LLM output
            lines = plan_text.split("\n");
            questions = [];
            main_topic = original_topic;
            
            for line in lines {
                line_stripped = line.strip();
                
                # Extract topic name if provided
                if line_stripped.startswith("TOPIC:") {
                    main_topic = line_stripped.replace("TOPIC:", "").strip();
                }
                
                # Extract each research question
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

            # MULTI-SEARCH: Execute 3 searches per question for comprehensive coverage
            all_findings = [];
            search_num = 0;
            
            for question in questions {
                # Generate 2-3 search variations for different perspectives
                variations_text = generate_search_variations(question);
                variation_lines = variations_text.split("\n");
                
                # Parse search variations from LLM output
                search_queries = [question];  # Start with original question
                for vline in variation_lines {
                    vline_stripped = vline.strip();
                    if vline_stripped.startswith("V1:") {
                        search_queries.append(vline_stripped.replace("V1:", "").strip());
                    } elif vline_stripped.startswith("V2:") {
                        search_queries.append(vline_stripped.replace("V2:", "").strip());
                    } elif vline_stripped.startswith("V3:") {
                        search_queries.append(vline_stripped.replace("V3:", "").strip());
                    }
                }
                
                # Execute all search variations and combine results
                combined_results = "";
                for query in search_queries {
                    search_num = search_num + 1;
                    search_result = web_search(query);
                    combined_results = combined_results + search_result + "\n\n";
                }
                
                # Store findings for this question
                finding = {
                    "num": len(all_findings) + 1,
                    "question": question,
                    "content": combined_results
                };
                all_findings.append(finding);
            }
      
            # Combine all search data for LLM report generation
            combined_data = "Research Topic: " + main_topic + "\n";
            combined_data = combined_data + "User Context: " + user_answers + "\n\n";
            
            for finding in all_findings {
                combined_data = combined_data + "Research Question " + str(finding["num"]) + ": ";
                combined_data = combined_data + finding["question"] + "\n";
                combined_data = combined_data + "Search Results:\n" + finding["content"] + "\n\n";
                combined_data = combined_data + "---\n\n";
            }
            
            # Generate comprehensive markdown report (LLM handles all synthesis and formatting)
            markdown_report = generate_markdown_report(
                main_topic, 
                combined_data, 
                search_num,
                user_answers
            );
            
            # CRITICAL FIX: Normalize all headers to ## format
            markdown_report = markdown_report.replace("####", "##");
            markdown_report = markdown_report.replace("###", "##");
            
            # Also convert literal \n to actual newlines (safety net)
            markdown_report = markdown_report.replace("\\n", "\n");
            
            # Return simple object with raw markdown text
            result = {
                "type": "research_report",
                "topic": main_topic,
                "markdown": markdown_report,
                "metadata": {
                    "search_count": search_num,
                    "question_count": len(questions)
                }
            };
            
            report result;
            
        } else {
            # PHASE 1: CLARIFICATION
            
            # Generate clarification questions via LLM
            clarification_text = generate_clarification_questions(self.userinput);
            
            # Return simple object with raw text
            result = {
                "type": "clarification",
                "text": clarification_text,
                "topic": self.userinput
            };
            
            report result;
        }
    }
}