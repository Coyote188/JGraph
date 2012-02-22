package org.coyote.webapp;

import java.applet.Applet;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;

public class WebAppletTopo extends Applet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6871322915850550431L;

	String str = "";
	
	public WebAppletTopo() {
		super();
	}

	public void destroy() {
		// Put your code here
	}
	
	@Override
	public void paint(Graphics g){
		g.setColor(Color.pink);
		Font f = new Font("Arial",Font.PLAIN,12);
		g.setFont(f);
		g.drawString(str, 20, 20);
		
		g.setColor(Color.blue);
		f = new Font("Tahoma",Font.BOLD,18);
		g.setFont(f);
		g.drawString(str, 40, 40);
	}

	public String getAppletInfo() {
		return "This is my default applet created by Eclipse";
	}

	public void init() {
		// Put your code here
		str = "i am coyote ,1st applet";
	}

	public void start() {
		// Put your code here
		System.out.println("running~ new");
	}

	public void stop() {
		// Put your code here
	}

}
