export default function Login() {
  return (
    <form>
      <label>
        <input type="email" data-testid="email-input" placeholder="Email" />
      </label>
      <label>
        <input type="password" data-testid="password-input" placeholder="Senha" />
      </label>
      <label htmlFor="btn-enter">
        <button type="submit" id="btn-enter" data-testid="login-submit-btn">ENTER</button>
      </label>
    </form>
  );
}
