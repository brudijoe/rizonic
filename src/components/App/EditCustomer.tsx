import { useState } from "react";
import { customerEdited } from "../../redux/dataSlice";
import { useAppDispatch } from "../../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";

interface Props {
  currentCustomerId: number;
}

const EditCustomer = (props: Props) => {
  const dispatch = useAppDispatch();

  const currentCustomerIdProps = props.currentCustomerId;

  const handleCustomerEdited = async () => {
    if (customerName.length > 0) {
      try {
        const resultAction = await dispatch(
          customerEdited({
            currentCustomerIdProps,
            customerName,
          })
        );
        unwrapResult(resultAction);
      } catch (err) {
        console.error("Failed to edit customer: ", err);
      }
      setCustomerName("");
      setModalIsOpen(false);
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [customerName, setCustomerName] = useState<string>("");
  const handleCustomerNameChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setCustomerName(e.currentTarget.value);

  return (
    <div className="">
      <div>
        {modalIsOpen ? (
          <div className="hidden"></div>
        ) : (
          <button
            type="button"
            className="w-full h-7 flex items-center justify-center rounded bg-blue-500 border-black border hover:bg-blue-300"
            onClick={openModal}
          >
            <IconContext.Provider value={{ size: "1.25em" }}>
              <GrEdit />
            </IconContext.Provider>
          </button>
        )}
      </div>
      <div>
        {modalIsOpen ? (
          <div className="rounded border border-black p-3 bg-blue-500">
            <div className="flex flex-row justify-between items-center">
              <div className="invisible">Hidden</div>
              <h1 className="text-center">Edit Customer</h1>
              <div>
                <IconContext.Provider value={{ size: "1.25em" }}>
                  <AiOutlineClose
                    className="cursor-pointer mr-3"
                    onClick={closeModal}
                  />
                </IconContext.Provider>
              </div>
            </div>
            <div className="flex flex-row p-3">
              <div className="w-3/6">Customer-Name:</div>
              <div className="w-3/6">
                <input
                  maxLength={100}
                  className="w-full h-7 mb-3 p-3 rounded border border-black box-border resize-y focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  value={customerName}
                  onChange={handleCustomerNameChanged}
                />
                <button
                  type="button"
                  className="w-full rounded h-7 bg-blue-600 border-black border hover:bg-blue-300"
                  onClick={handleCustomerEdited}
                >
                  Change Customer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden">Modal is closed</div>
        )}
      </div>
    </div>
  );
};

export default EditCustomer;
