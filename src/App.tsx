// import './App.css'
import { Box, Input, Button, useClipboard, Code } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { keccak256, toUtf8Bytes, BytesLike } from "ethers"


function App() {

  const [inputValue, setInputValue] = useState<string>("");

  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  function handleValue() {
    const bytes: BytesLike = toUtf8Bytes(inputValue);
    const hash: string = keccak256(bytes);
    setValue(hash.slice(2));
  }
  
  useEffect(() => {
    if(inputValue) {
      handleValue();
    } else {
      setValue("");
    }
  }, [inputValue])


  return (
    <>
      <Box maxW="80vw" mx="auto">
        <div className="h-screen flex items-center justify-center flex-col gap-5">
          <h1 className="text-center text-[2rem] font-bold text-[#89CE94]">Welcome to <span className="text-[#7D5BA6]">Ethereum</span> wallet generator</h1>
          <div>
            <p className="text-[#86A59C] font-bold mb-[10px]">Input anything to generate a private key</p>
            <Input onChange={(e) => { setInputValue(e.target.value) }} value={inputValue} />
          </div>
          {value && <>
            <p>Private key:</p>
            <Code colorScheme="red" className="break-all">{value}</Code>
            <Button onClick={onCopy} colorScheme="whatsapp">{hasCopied ? "Copied!" : "Copy to Clipboard"}</Button>
          </>}
        </div>
        
      </Box>
    </>
  )
}

export default App
