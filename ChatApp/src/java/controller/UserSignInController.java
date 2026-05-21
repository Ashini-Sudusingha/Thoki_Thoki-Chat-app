package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sun.xml.ws.security.opt.impl.util.SOAPUtil;
import entity.User;
import java.io.IOException;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import socket.ProfileService;
import util.HibernateUtil;


@MultipartConfig
@WebServlet(name = "UserSignInController", urlPatterns = {"/UserSignInController"})
public class UserSignInController extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String countryCode = request.getParameter("countryCode");
        String contactNo = request.getParameter("contactNo");

        System.out.println(request.getParameter("countryCode"));
        System.out.println(contactNo);
        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        if (countryCode.isEmpty()) {
            responseObject.addProperty("message", "Country code is required");
        } else if (contactNo.isEmpty()) {
            responseObject.addProperty("message", "Contact number is required");
        } else {
            Session s = HibernateUtil.getSessionFactory().openSession();
            Criteria c1 = s.createCriteria(User.class);
            c1.add(Restrictions.eq("countryCode", countryCode));
            c1.add(Restrictions.eq("contactNo", contactNo));
            User user = (User) c1.uniqueResult();
            if (user != null) {
                Transaction tr = s.beginTransaction();

                int id = user.getId();
                tr.commit();
                s.close();

                responseObject.add("user", gson.toJsonTree(user));


                responseObject.addProperty("status", true);
                responseObject.addProperty("userId", id);

            } else {
                responseObject.addProperty("message", "This contact is not exsit Pleace sign Up first !");

            }
        }
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
    }

}
