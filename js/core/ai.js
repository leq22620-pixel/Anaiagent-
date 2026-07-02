export async function askAI(message){

    const response = await fetch(

        "/.netlify/functions/chat",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                message

            })

        }

    );

    return await response.json();

}