"use client";

export default function Button() {
  const signOut = () => {
    // sign out behaviour
  }
return (

    <button
      className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      onClick={signOut}
    >
      Logout
    </button>
)
}
