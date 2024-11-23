import { Assignee } from "@/api/models/tasks.model.ts";

const InitialData = {
  getAssigneeData: (): Assignee[] => {
    return [
      {
        id: "1",
        name: "John Doe",
        profileImage:
          "https://cdn.pixabay.com/photo/2022/04/04/11/52/man-7111002_960_720.jpg",
      },
      {
        id: "2",
        name: "Jane Smith",
        profileImage:
          "https://thumbs.dreamstime.com/b/front-portrait-woman-beauty-face-isolated-beauty-face-young-beautiful-girl-healthy-skin-skin-care-front-188607400.jpg",
      },
      {
        id: "3",
        name: "Alice Johnson",
        profileImage:
          "https://img.stablecog.com/insecure/256w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vMTBkODMzOTgtYTUyNi00MjcxLThkYTQtMGFmZmEyZDAzYzlhLmpwZWc.webp",
      },
      {
        id: "4",
        name: "Bob Brown",
        profileImage:
          "https://cdn.pixabay.com/photo/2021/11/19/20/20/portrait-6810236_960_720.jpg",
      },
    ];
  },
};

export { InitialData };
