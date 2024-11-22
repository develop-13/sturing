import User from "@/models/User";

export async function GET(request: Request) {
  // 사용자가 매칭정보를 설정했는지여부를 알려줌

  const { searchParams } = new URL(request.url);

  const userEmail = searchParams.get("userEmail");

  if (!userEmail) {
    return Response.json({
      message: "사용자 이메일값이 없습니다",
      status: 400,
    });
  }

  try {
    const existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      return Response.json(
        { message: "존재하지 않는 사용자 입니다." },
        { status: 400 }
      );
    }

    const userMatchingInfo = existingUser.matchingInfo;
    return Response.json(
      { hasMatchingInfo: !!userMatchingInfo },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "DB통신 오류 발생 from 'user/api' " },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  // 사용자정보의 유무, 매칭정보의 유무를 응답으로 보낸다.
  // DB에 사용자 정보가 존재하는지 확인하고 없다면 추가
  //DB에 사용자 정보가 있을 때, 매칭정보는 있는지 확인

  // const { searchParams } = new URL(request.url);
  // const userEmail = searchParams.get("userEmail");
  // const userName = searchParams.get("userName");

  const { userEmail, userName, userImg } = await request.json();

  if (!userEmail || !userName) {
    return Response.json(
      { message: "사용자 정보가 부족합니다." },
      { status: 400 }
    );
  }

  try {
    let existingUser = await User.findOne({ email: userEmail });
    // DB에 존재하는 사용자인지 확인

    if (!existingUser) {
      // DB에 사용자 정보가 없으면 생성
      existingUser = await User.create({
        email: userEmail,
        name: userName,
        imgSrc: userImg || "/img/profile/defaultProfileImage.png",
        matchingInfo: null,
        recentQueries: [],
        recentViewedStudies: [],
        study_in_participants: [],
        schedules: [],
        watchList: [],
        Accepted_applies: [],
        applies: [],
      });
      return Response.json(
        { hasUser: true, hasMatchingInfo: false },
        { status: 200 }
      );
    }

    const matchingInfo = existingUser.matchingInfo;

    if (matchingInfo) {
      return Response.json(
        { hasUser: true, hasMatchingInfo: true },
        { status: 200 }
      );
    } else {
      return Response.json(
        { hasUser: true, hasMatchingInfo: false },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      { error: "Failed to handle user document from 'user/api' " },
      { status: 500 }
    );
  }
}
