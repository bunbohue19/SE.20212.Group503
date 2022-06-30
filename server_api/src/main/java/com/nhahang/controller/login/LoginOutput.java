package com.nhahang.controller.login;

public class LoginOutput {
    private boolean isValidId;
    private boolean isValidPassword;

    public void setValidId(boolean validId) {
        isValidId = validId;
    }

    public void setValidPassword(boolean validPassword) {
        isValidPassword = validPassword;
    }

	public boolean isValidId() {
		return isValidId;
	}

	public boolean isValidPassword() {
		return isValidPassword;
	}
    
}
