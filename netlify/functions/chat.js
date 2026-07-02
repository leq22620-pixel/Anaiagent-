export default async (request) => {

    if (request.method !== "POST") {
        return new Response(
            JSON.stringify({
                error: "Method not allowed"
            }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    try {

        const { message } = await request.json();

        const apiKey = process.env.GEMINI_API_KEY;

        const url =
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                contents: [
                    {
                        parts: [
                            {
                                text: message
                            }
                        ]
                    }
                ]

            })

        });
console.log("Status:", response.status);
        const data = await response.json();
        console.log("Gemini response:", JSON.stringify(data, null, 2));

        const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text
        ?? "Xin lỗi, tôi chưa có câu trả lời.";

        return new Response(

            JSON.stringify({

                reply: text

            }),

            {

                headers: {

                    "Content-Type":"application/json"

                }

            }

        );

    }

    catch(err){

        return new Response(

            JSON.stringify({

                error:err.message

            }),

            {

                status:500,

                headers:{

                    "Content-Type":"application/json"

                }

            }

        );

    }

}