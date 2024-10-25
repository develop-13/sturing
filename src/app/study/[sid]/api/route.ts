import dbConnect from "@/lib/mongodb";
import Study from "@/models/Study";
import { NextRequest } from "next/server";
import User from "@/models/User";
import Role from "@/models/Role";

export async function GET(req: NextRequest) {
  await dbConnect();

  console.log("study/[sid]/api/route.ts called");

  const { searchParams } = new URL(req.url);
  const studyId = searchParams.get("sid") || "";

  try {
    const study = await Study.findOne({
      _id: studyId,
    });

    const studyMembersEmails = study.currentMembers;

    // 이메일을 키로 사용하여 user 정보와 role을 매핑할 객체 생성
    const userEmailRoleMap: Record<string, any> = {};

    // 스터디 멤버 정보 가져오기
    const studyMembers = await User.find({
      email: { $in: studyMembersEmails },
    }).select({
      email: 1,
      imgSrc: 1,
      name: 1,
    });

    // 역할 정보 가져오기
    const roles = await Role.find({
      studyId: studyId,
      userEmail: { $in: studyMembersEmails },
    });

    // 각 studyMember의 정보를 userEmailRoleMap에 추가하고, 역할도 매핑

    type TStudyMember = { email: string; imgSrc: string; name: string };

    studyMembers.forEach((studyMember: TStudyMember) => {
      userEmailRoleMap[studyMember.email] = {
        imgSrc: studyMember.imgSrc,
        name: studyMember.name,
        role: null, // 기본 값 설정
      };

      // studyMember에 해당하는 role이 있는 경우 추가
      const userRole = roles.find(
        (role) => role.userEmail === studyMember.email
      );
      if (userRole) {
        userEmailRoleMap[studyMember.email].role = userRole.role;
      }
    });

    const response = {
      study,
      userEmailRoleMap,
    };

    // response 반환
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Study not found" }), {
      status: 404,
    });
  }
}
