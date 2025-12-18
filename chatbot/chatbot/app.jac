import from byllm.lib { Model }
import from tavily { TavilyClient }
import os;

glob llm = Model(
    model_name="mistral/mistral-large-latest",
    temperature=0.7,
    max_tokens=3500
);

glob tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"));

# TOOLS
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

# PHASE 1: CLARIFICATION
"""Generate 3-5 clarifying questions about the research topic.
Format as Q1:, Q2:, Q3:, etc. Keep questions specific and focused."""
def generate_clarification_questions(user_input: str) -> str by llm();

# PHASE 2: RESEARCH PLANNING
"""Create 5 targeted research questions based on topic and user answers.
Format: TOPIC: [name], then Q1: through Q5: with specific questions."""
def generate_targeted_research_plan(topic: str, user_answers: str) -> str by llm();

# MULTI-SEARCH VARIATIONS
"""Generate 2-3 search variations to explore different angles of a question.
Format as V1:, V2:, V3: with related but distinct queries.
Each variation should provide complementary information."""
def generate_search_variations(question: str) -> str by llm();

# PHASE 3: ENHANCED SYNTHESIS
"""Analyze search results and extract detailed insights with evidence.
Include specific data points like numbers, percentages, and dates.
Format: INSIGHT: [detail] followed by EVIDENCE: [support].
Group related findings into THEME: sections with bullet points.
Add RECOMMENDATION: with RATIONALE: for actionable advice."""
def synthesize_research(topic: str, all_search_data: str) -> str by llm();

# PHASE 4: COMPREHENSIVE REPORT
"""Create a comprehensive 1500-2000 word research report.
Start with SUMMARY: (4-5 sentences with key numbers).
List FINDINGS: as bullet points with 2-3 sentences each.
Create multiple SECTION: entries with 3-4 paragraphs (200-300 words) covering different aspects.
Include specific data, examples, and actionable recommendations throughout.
Use plain text only - no markdown symbols like asterisks or hashtags."""
def generate_final_report(topic: str, synthesis: str, search_count: int) -> str by llm();

# RESEARCH BOT WALKER
walker research_bot {
    has userinput: str;
    has formatted_history: str;

    can process with `root entry {
        let is_clarification_response = " - " in self.userinput;
        
        if is_clarification_response {
            # PHASE 2: RESEARCH WITH MULTI-SEARCH
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

            # MULTI-SEARCH: 3 searches per question
            all_findings = [];
            search_num = 0;
            
            for question in questions {
                variations_text = generate_search_variations(question);
                variation_lines = variations_text.split("\n");
                
                search_queries = [question];
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
                
                combined_results = "";
                for query in search_queries {
                    search_num = search_num + 1;
                    search_result = web_search(query);
                    combined_results = combined_results + search_result + "\n\n";
                }
                
                finding = {
                    "num": len(all_findings) + 1,
                    "question": question,
                    "content": combined_results,
                    "searches": len(search_queries)
                };
                all_findings.append(finding);
            }
      
            # PHASE 3: DEEP SYNTHESIS
            combined_data = "Research Topic: " + main_topic + "\n";
            combined_data = combined_data + "User Context: " + user_answers + "\n\n";
            
            for finding in all_findings {
                combined_data = combined_data + "Question " + str(finding["num"]) + ": " + finding["question"] + "\n";
                combined_data = combined_data + "Search Results (" + str(finding["searches"]) + " searches):\n";
                combined_data = combined_data + finding["content"] + "\n\n";
            }
            
            synthesis = synthesize_research(main_topic, combined_data);
            
            # PHASE 4: COMPREHENSIVE REPORT
            report_text = generate_final_report(main_topic, synthesis, search_num);
            report_text = report_text.replace("**", "");
            
            # Parse report into structured data
            report_lines = report_text.split("\n");
            summary_text = "";
            findings_list = [];
            sections_list = [];
            current_section_title = "";
            current_section_content = "";
            in_findings = False;
            
            for line in report_lines {
                line_stripped = line.strip();
                
                if line_stripped.startswith("SUMMARY:") {
                    summary_text = line_stripped.replace("SUMMARY:", "").strip();
                } elif line_stripped.startswith("FINDINGS:") {
                    in_findings = True;
                } elif line_stripped.startswith("SECTION:") {
                    if current_section_title and current_section_content {
                        sections_list.append({
                            "title": current_section_title,
                            "content": current_section_content.strip()
                        });
                    }
                    in_findings = False;
                    current_section_title = line_stripped.replace("SECTION:", "").strip();
                    current_section_content = "";
                } elif line_stripped.startswith("-") and in_findings {
                    findings_list.append(line_stripped.replace("-", "").strip());
                } elif len(line_stripped) > 0 and not in_findings and current_section_title {
                    current_section_content = current_section_content + line_stripped + "\n\n";
                }
            }
            
            if current_section_title and current_section_content {
                sections_list.append({
                    "title": current_section_title,
                    "content": current_section_content.strip()
                });
            }
            
            # Return structured data
            result = {
                "type": "research_report",
                "topic": main_topic,
                "summary": summary_text,
                "findings": findings_list,
                "sections": sections_list,
                "metadata": {
                    "search_count": search_num,
                    "question_count": len(questions)
                }
            };
            
            report result;
            
        } else {
            # PHASE 1: CLARIFICATION
            clarification_qs = generate_clarification_questions(self.userinput);
            
            # Parse questions into list
            question_lines = clarification_qs.split("\n");
            questions_list = [];
            
            for line in question_lines {
                line_stripped = line.strip();
                if line_stripped.startswith("Q1:") {
                    questions_list.append(line_stripped.replace("Q1:", "").strip());
                } elif line_stripped.startswith("Q2:") {
                    questions_list.append(line_stripped.replace("Q2:", "").strip());
                } elif line_stripped.startswith("Q3:") {
                    questions_list.append(line_stripped.replace("Q3:", "").strip());
                } elif line_stripped.startswith("Q4:") {
                    questions_list.append(line_stripped.replace("Q4:", "").strip());
                } elif line_stripped.startswith("Q5:") {
                    questions_list.append(line_stripped.replace("Q5:", "").strip());
                }
            }
            
            # Return structured data
            result = {
                "type": "clarification",
                "questions": questions_list
            };
            
            report result;
        }
    }
}