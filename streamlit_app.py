import requests
import streamlit as st

# Basic config(end points)
API_BASE = "http://localhost:8000" 
WALKER_ENDPOINT = f"{API_BASE}/walker/agent"
SIGNUP_ENDPOINT = f"{API_BASE}/user/create"
LOGIN_ENDPOINT  = f"{API_BASE}/user/login"

# Page setup
st.set_page_config(page_title="Chat Bot")
st.title("Chat Bot")
st.write("Type a question")

# Session state
if "auth_token" not in st.session_state:
    st.session_state.auth_token = None

# Auth UI
with st.expander("Authentication (first do Sign up & Login)"):
    email = st.text_input("Email", value="user@example.com")
    password = st.text_input("Password", type="password", value="string")
    do_auth = st.button("Sign up & Login")

# Auth Logic
def obtain_token(email: str, password: str) -> str | None:
    # Signup
    try:
        _ = requests.post(
            SIGNUP_ENDPOINT,
            json={"email": email, "password": password, "username": email.split("@")[0]},
            timeout=30,
        )
    except requests.RequestException:
        pass

    # Login
    try:
        resp = requests.post(
            LOGIN_ENDPOINT,
            json={"email": email, "password": password},
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
        token = data.get("token")
        return token
    except requests.RequestException:
        return None

# Auth Trigger(button handler)
if do_auth:
    if not email.strip() or not password.strip():
        st.error("Please enter email and password.")
    else:
        token = obtain_token(email.strip(), password)
        if token:
            st.session_state.auth_token = token
            st.success("Authenticated. Token acquired.")
        else:
            st.error("Authentication failed. Check credentials and server logs.")

# User input
user_message = st.text_area(
    "Your question:",
    height=100,
    placeholder="Ask me anything...",
)

send = st.button("Send")

# Function to get auth headers
def auth_headers():
    if st.session_state.auth_token:
        return {"Authorization": f"Bearer {st.session_state.auth_token}"}
    return {}

# Shat request (button handler)
if send:
    if not user_message.strip():
        st.warning("Please type a question first.")
    elif not st.session_state.auth_token:
        st.warning("Please authenticate first (use 'Sign up & Login').")
    else:
        try:
            payload = {"message": user_message}
            response = requests.post(
                WALKER_ENDPOINT,
                json=payload,
                headers=auth_headers(),
                timeout=120,
            )
            response.raise_for_status()
            data = response.json()

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
                st.json(response.json())
            except Exception:
                pass
        except requests.RequestException as e:
            st.error(f"Error talking to backend: {e}")