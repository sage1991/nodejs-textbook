import { Strategy } from "passport-kakao"
import { Env } from "../../const"
import { userRepository } from "../../../repository"

export const kakao = new Strategy(
  {
    clientID: Env.kakao.clientId,
    callbackURL: "/auth/kakao/oauth"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log("kakao profile", profile)
      let user = await userRepository.findOneBy({ snsId: profile.id, provider: "kakao" })
      if (!user) {
        user = await userRepository.save(
          userRepository.create({
            email: profile._json.kakao_account.email,
            nickname: profile.displayName,
            snsId: profile.id,
            provider: "kakao"
          })
        )
      }
      done(null, user)
    } catch (e) {
      console.error(e)
      done(e)
    }
  }
)
