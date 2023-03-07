import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import authConfig from '../../config/auth'

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const userEmailOrPasswordIncorret = () => {
      return response
        .status(400)
        .json({ error: 'make sure your password or email are correct' })
    }

    if (!(await schema.isValid(request.body))) {
      userEmailOrPasswordIncorret()
    }

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })
    if (!user) {
      userEmailOrPasswordIncorret()
    }

    if (!(await user.checkPassword(password))) {
      userEmailOrPasswordIncorret()
    }

    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
