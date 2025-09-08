package org.example.tests;

import java.util.HashMap;
import java.util.Map;

public class UserManager {
    private Map<Integer, Object> usersMap;
    private int counter = 0;

    public UserManager() {
        this.usersMap = new HashMap();
    }
    public UserManager(Map usersMap) {
        this.usersMap = usersMap;
    }

    public boolean addUser(String email) {
        this.usersMap.put(++counter, email);
        return true;
    }

    public boolean deleteUserById(int userID) {
        this.usersMap.remove(userID);
        return true;
    }

}
