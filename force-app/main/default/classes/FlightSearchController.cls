public with sharing class FlightSearchController {
   
    @AuraEnabled(cacheable=true)
    public static List<Airlines__c> searchFlights(String departureAirport,String arrivalAirport,Date departureDate){

        return [SELECT Name,City_From__c,City_To__c,Departure_Date__c,Price__c FROM Airlines__c 
        WHERE City_From__c=:departureAirport AND 
        City_To__c=:arrivalAirport AND 
        Departure_Date__c=:departureDate];
    }

    @AuraEnabled
    public static void createBooking(Id flightId,String Name,
    String Email,String Phone,String departureAirport,
    String arrivalAirport,Date departureDate,
    Decimal Price){

        Booking__c newBooking=new Booking__c();
        newBooking.Airline_Name__c=flightId;
        newBooking.Name=Name;
        newBooking.Email__c=Email;
        newBooking.Phone_No__c=Phone;
        newBooking.City_From__c=departureAirport;
        newBooking.City_To__c=arrivalAirport;
        newBooking.Departure_Date__c=departureDate;
        newBooking.price__c=Price;

        try {
            insert newBooking;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    
}