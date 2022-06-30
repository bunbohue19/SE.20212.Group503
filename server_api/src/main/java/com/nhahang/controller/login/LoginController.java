package com.nhahang.controller.login;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nhahang.service.AccountService;

@RestController
public class LoginController {

    // http://localost:8080/login
    @PostMapping("/login")
    public LoginOutput saveAccount(@RequestBody LoginInput loginInput) {
    	System.out.println(loginInput.getId()+": "+loginInput.getPassword());
    	int a= AccountService.check(loginInput.getId(), loginInput.getPassword());
    	LoginOutput b= new LoginOutput();
    	
    	if(a==0)
    	{
    		b.setValidId(true);
    		b.setValidPassword(true);
    	}
    	else if(a==1)
    	{
    		b.setValidId(true);
    		b.setValidPassword(false);
    	}
    	else if(a==-1)
    	{
    		b.setValidId(false);
    		b.setValidPassword(false);
    	}
    	
    	return b;
    }
    
    @RequestMapping("/test")
    public void test(@RequestParam(defaultValue = "test") String id) {
        System.out.println("ID: " + id);
    }
}
