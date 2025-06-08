
{/*async since having to fetch*/}
const get_info = async () => {         //my flask endpoint
    const res = await fetch("http://127.0.0.1:5000/incomes");
    const data = await res.json();

    console.log(data.amount);//inside here i can directly grab stuff but once leave becomes promise
    amount = data.amount;//works to just set a variable inside here and use later
    return data;
}

const log_amount = () => {
    console.log(amount)
}

let amount;
let test_words = "my butt";


export default function Profile({team, change_team}){
    get_info()

    return(
        <div className="profile">
        
        <button onClick={() => console.log(team)}>this</button>
        <button onClick={log_amount}>log amount</button>


        <div>
            <p>{test_words}</p>
        </div>
        </div>
    )
}