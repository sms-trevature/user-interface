export class status {
    status_id: number ;
    generic_status: string;
    specific_status: string; 
    virtual: boolean;

    constructor(status_id: number, generic_status: string, specific_status: string, virtual: boolean){
            this.status_id = status_id; 
            this.generic_status = generic_status; 
            this.specific_status = specific_status; 
            this.virtual = virtual; 
    }
    
 }
 