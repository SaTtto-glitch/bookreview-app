export const Router = () => {
    const auth = useSelector((state) => state.auth.isSignIn);
  
    return (
      <div>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {auth ? (
            <>
              <Route index element={<Home />} />
              <Route path="/task/new" element={<NewTask />} />
              <Route path="/list/new" element={<NewList />} />
              <Route path="/lists/:listId/tasks/:taskId" element={<EditTask />} />
              <Route path="/lists/:listId/edit" element={<EditList />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/signin" />} />
          )}
          <Route element={<NotFound />} />
        </Routes>
      </div>
    );
  };
  