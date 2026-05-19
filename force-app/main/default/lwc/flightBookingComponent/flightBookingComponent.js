import { LightningElement } from 'lwc';
import searchFlights from '@salesforce/apex/FlightSearchController.searchFlights';
import createBooking from '@salesforce/apex/FlightSearchController.createBooking';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class FlightBookingComponent extends LightningElement {
    DepartureAirport;
    ArrivalAirport;
    DepartureDate;
    showFlights=false;
    flights;
    selectedFlight;
    showModal=false;
    name;
    email;
    phone;

    handleDepartureAirportChange(event)
    {

        this.DepartureAirport=event.target.value;
        console.log(this.DepartureAirport);
    }

    handleArrivalAirportChange(event)
    {
        this.ArrivalAirport=event.target.value;
        console.log(this.ArrivalAirport);
    }

    handleDepartureDateChange(event)
    {
        this.DepartureDate=event.target.value;
        console.log(this.DepartureDate);
    }

    handleSearchFlights(event)
    {
        searchFlights({departureAirport:this.DepartureAirport,
                       arrivalAirport:this.ArrivalAirport,
                       departureDate:this.DepartureDate})
                       .then(result=>
                       {
                            this.flights=result;
                            console.log(this.flights);
                       })
                       .catch(error=>{
                        console.log(error);
                       });
        this.showFlights=true;

    }

    handleBookNow(event)
    {
        const flightId=event.currentTarget.dataset.flightId;

        this.selectedFlight=this.flights.find(flight=>flight.Id===flightId);
        this.showModal=true;
    }

    handleModal()
    {
        this.showModal=false;
    }

    handlename(event)
    {

        this.name=event.target.value;
    }

    handleemail(event)
    {

        this.email=event.target.value;
    }

    handlephone(event)
    {

        this.phone=event.target.value;
    }

    handleConfirmBooking()
    {
        createBooking({ flightId:this.selectedFlight.Id, Name:this.name,
     Email:this.email, Phone:this.phone, departureAirport:this.selectedFlight.City_From__c,
     arrivalAirport:this.selectedFlight.City_To__c, departureDate:this.selectedFlight.Departure_Date__c,
     Price:this.selectedFlight.Price__c})

     .then(result=>{
        this.showModal=false;
        this.showToast();
     })
     .catch(error=>{
        console.error(error);
     })
    }

    showToast() {
    const evt = new ShowToastEvent({
      title: "Success",
      message:
        "Booking record created successfully!!!!!!!!",
        variant:'success'
    });
    this.dispatchEvent(evt);
  }

}