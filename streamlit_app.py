import requests
import streamlit as st

API_URL = "http://localhost:8000/walker/agent"

API_TOKEN = (
    "Bearer "
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWM1N2ZmODViMWIwNTc3NjI2ZGYxNSIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvb3RfaWQiOiI2OTFjNTdmZjg1YjFiMDU3NzYyNmRmMTQiLCJpc19hY3RpdmF0ZWQiOnRydWUsImlzX2FkbWluIjpmYWxzZSwiZXhwaXJhdGlvbiI6MTc2MzY0OTQ5NSwic3RhdGUiOiJZaFl0alZCdSJ9.wh9kDqgV9rKND1xqURnu8BaQnB99GIqp7wTF19_zmUA"
)

HEADERS = {"Authorization": API_TOKEN}

st.set_page_config(page_title="Chat Bot")
st.title("Chat Bot ")
st.write("Type a question")

user_message = st.text_area(
    "Your question:",
    height=100,
    placeholder="Ask me anything...",
)

if st.button("Send"):
    if not user_message.strip():
        st.warning("Please type a question first.")
    else:
        try:
            payload = {"message": user_message}

            response = requests.post(
                API_URL,
                json=payload,
                headers=HEADERS,
                timeout=120,
            )

            response.raise_for_status()

            data = response.json()

            # st.subheader("Raw API response (debug)")
            # st.json(data)

            bot_reply = None
            if isinstance(data, dict) and "reports" in data:
                value = data["reports"]
                if isinstance(value, list):
                    bot_reply = "\n".join(map(str, value))
                else:
                    bot_reply = str(value)
            # elif isinstance(data, dict) and "report" in data:
            #     value = data["report"]
            #     if isinstance(value, list):
            #         bot_reply = "\n".join(map(str, value))
            #     else:
            #         bot_reply = str(value)
            else:
                bot_reply = str(data)

            st.subheader("Bot reply")
            st.write(bot_reply)

        except requests.HTTPError as e:
            st.error(f"HTTP error from backend: {e} (status {e.response.status_code})")
            try:
                st.json(e.response.json())
            except Exception:
                pass
        except requests.RequestException as e:
            st.error(f"Error talking to backend: {e}")
