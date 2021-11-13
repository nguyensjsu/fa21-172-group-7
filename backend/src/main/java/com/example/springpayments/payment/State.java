package com.example.springpayments.payment;

import java.util.*;

public class State {

    Map<String, String> states = new HashMap<String, String>();
    State(){
    states.put("Alabama","AL");
    states.put("Alaska","AK");
    states.put("Alberta","AB");
    states.put("American Samoa","AS");
    states.put("Arizona","AZ");
    states.put("Arkansas","AR");
    states.put("Armed Forces (AE)","AE");
    states.put("Armed Forces Americas","AA");
    states.put("Armed Forces Pacific","AP");
    states.put("British Columbia","BC");
    states.put("California","CA");
    states.put("Colorado","CO");
    states.put("Connecticut","CT");
    states.put("Delaware","DE");
    states.put("District Of Columbia","DC");
    states.put("Florida","FL");
    states.put("Georgia","GA");
    states.put("Guam","GU");
    states.put("Hawaii","HI");
    states.put("Idaho","ID");
    states.put("Illinois","IL");
    states.put("Indiana","IN");
    states.put("Iowa","IA");
    states.put("Kansas","KS");
    states.put("Kentucky","KY");
    states.put("Louisiana","LA");
    states.put("Maine","ME");
    states.put("Manitoba","MB");
    states.put("Maryland","MD");
    states.put("Massachusetts","MA");
    states.put("Michigan","MI");
    states.put("Minnesota","MN");
    states.put("Mississippi","MS");
    states.put("Missouri","MO");
    states.put("Montana","MT");
    states.put("Nebraska","NE");
    states.put("Nevada","NV");
    states.put("New Brunswick","NB");
    states.put("New Hampshire","NH");
    states.put("New Jersey","NJ");
    states.put("New Mexico","NM");
    states.put("New York","NY");
    states.put("Newfoundland","NF");
    states.put("North Carolina","NC");
    states.put("North Dakota","ND");
    states.put("Northwest Territories","NT");
    states.put("Nova Scotia","NS");
    states.put("Nunavut","NU");
    states.put("Ohio","OH");
    states.put("Oklahoma","OK");
    states.put("Ontario","ON");
    states.put("Oregon","OR");
    states.put("Pennsylvania","PA");
    states.put("Prince Edward Island","PE");
    states.put("Puerto Rico","PR");
    states.put("Quebec","QC");
    states.put("Rhode Island","RI");
    states.put("Saskatchewan","SK");
    states.put("South Carolina","SC");
    states.put("South Dakota","SD");
    states.put("Tennessee","TN");
    states.put("Texas","TX");
    states.put("Utah","UT");
    states.put("Vermont","VT");
    states.put("Virgin Islands","VI");
    states.put("Virginia","VA");
    states.put("Washington","WA");
    states.put("West Virginia","WV");
    states.put("Wisconsin","WI");
    states.put("Wyoming","WY");
    states.put("Yukon Territory","YT");
    }

    public boolean CheckState(String abv){
        String abv_up = abv.toUpperCase();
        String x = states.get(abv_up);
        if (abv_up.length() != 2 || x == null) return false;
        return true;
    }

    public String convertMonth(String month){
        String month_lower = month.toLowerCase();
        String final_m = "";
        switch(month_lower){
            case "january":final_m = "01";
                     break;
            case "february":final_m = "02";
                     break;
            case "march":final_m = "03";
                     break;
            case "april":final_m = "04";
                     break;
            case "may":final_m = "05";
                     break;
            case "june":final_m = "06";
                     break;
            case "july":final_m = "07";
                     break;
            case "august":final_m = "08";
                     break;
            case "september":final_m = "09";
                     break;
            case "october":final_m = "10";
                     break;
            case "november":final_m = "11";
                     break;
            case "december":final_m = "12";
                     break;
            default :final_m = "na";
                     break;
        }
        return final_m;
    }
}