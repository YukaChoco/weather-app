import { ImageResponse } from 'next/server'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    const weatherState = "晴れ";
    let icon = "-";

    if (weatherState === "晴れ") {
        icon = "🌞";
    } else if (weatherState === "晴れ時々曇り") {
        icon = "🌤";
    } else if (weatherState === "曇り") {
        icon = "☁";
    } else if (weatherState === "雨") {
        icon = "☔";
    } else if (weatherState === "雪") {
        icon = "❄";
    }
    
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                {icon}
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
        }
    )
}