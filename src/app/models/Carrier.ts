export default class Carrier {

    id=0;
    display=''

    constructor(data: any) {
        this.id = data.id;
        this.display = data.display;

    }
}