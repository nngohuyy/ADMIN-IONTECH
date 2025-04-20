import SignInForm from './SignInForm'

export default function SignInPage() {
  return (
    <section className="grid grid-cols-2 gap-0 h-[100dvh]">
      <div className="w-full h-full bg-[url('/background-sign-in.jpg')] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      </div>
      <div className='flex justify-center items-center'>
        <SignInForm />
      </div>
    </section >
  )
}