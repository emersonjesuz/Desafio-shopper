export class RideEntity {
  private customer_id: string;
  private id: number;
  private date: Date;
  private origin: string;
  private destination: string;
  private distance: number;
  private duration: string;
  private value: number;
  private driver_id: number;
  constructor(
    customer_id: string,
    id: number,
    date: Date,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    value: number,
    driver_id: number
  ) {
    this.validateId(id);
    this.validateCustomerId(customer_id);
    this.validateDate(date);
    this.validateOrigin(origin);
    this.validateDestination(destination);
    this.validateDistance(distance);
    this.validateDuration(duration);

    this.customer_id = customer_id;
    this.id = id;
    this.date = date;
    this.origin = origin;
    this.destination = destination;
    this.distance = distance;
    this.duration = duration;
    this.value = value;
    this.driver_id = driver_id;
  }

  private validateId(id: number) {
    if (id <= 0) throw new Error("Id is obligatory");
  }
  private validateCustomerId(customer_id: string) {
    if (!customer_id.trim()) throw new Error("Customer Id is obligatory");
  }
  private validateDate(date: Date) {
    if (!date.getTime()) throw new Error("Date is invalid");
  }
  private validateOrigin(origin: string) {
    if (!origin.trim()) throw new Error("Origin is Obligatory");
  }
  private validateDestination(destination: string) {
    if (!destination.trim()) throw new Error("Destination is Obligatory");
  }
  private validateDistance(distance: number) {
    if (distance < 20) throw new Error("Distance is invalid");
  }
  private validateDuration(duration: string) {
    if (!duration) throw new Error("Duration is invalid");
  }
  toJson() {
    return {
      customer_id: this.customer_id,
      id: this.id,
      date: this.date,
      origin: this.origin,
      destination: this.destination,
      distance: this.distance,
      duration: this.duration,
      value: this.value,
      driver_id: this.driver_id,
    };
  }
}
