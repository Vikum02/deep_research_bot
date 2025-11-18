import from byllm.lib { Model }

glob llm = Model(model_name="gemini/gemini-2.0-flash");

def quick_test(phrase: str) -> str by llm(); 

with entry {
    out = quick_test("Test from Vikum"); 
    print(out);
}
