import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fullName = searchParams.get("fullName");
  const username = searchParams.get("username");
  const introPic = searchParams.get("introPic");

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
          <img
            src={introPic || `${process.env.NEXT_PUBLIC_BASE_URL}/blank_user_profile_150x150.png`}
            alt="Intro Pic"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: "50px"
          }}
        >
          <p
            style={{
              fontSize: 32,
              color: "#8b5cf6",
              margin: 0
            }}>
            {fullName}
          </p>
          <p
            style={{
              fontSize: 20,
              color: "#6b7280",
              margin: 0,
            }}
          >
            @{username}
          </p>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              margin: 0
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo_sh_portfolio_maker_100x100.png`}
              style={{
                height: "50px",
                width: "50px"
              }}
            />
            <p
              style={{
                fontSize: "22px"
              }}
            >
              SH PORTFOLIO MAKER
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
};
