
{/*async since having to fetch*/}
const get_data = async () => {         //my flask endpoint
    const res = await fetch("http://127.0.0.1:5000/incomes");
    const data = await res.json();
    return data;
}

const get_info = async () => {
    const temp = await get_data();
    console.log(temp);
    console.log("temp ^^^^^^^^");
    return temp;
}


export default function Profile({team, change_team}){
    const info = get_info();

    return(
        <div className="profile">
        
        <button onClick={() => console.log(team)}>this</button>
        
        
        <button onClick={() => console.log(info)}>Flask info</button>
        </div>
    )
}