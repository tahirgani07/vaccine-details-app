interface ISession {
    session_id:String;
    date:String;
    available_capacity:Number;
    min_age_limit:Number;
    max_age_limit:Number;
    vaccine:String;
    slots:String[];
}

interface IVaccineFees {
    vaccine:String;
    fee:String;
}

export interface ICenter {
    center_id:Number;
    name:String;
    address:String;
    state_name:String;
    district_name:String;
    pincode:Number;
    from:String;
    to:String;
    fee_type:String;
    sessions:ISession[];
    vaccine_fees:IVaccineFees[];
}