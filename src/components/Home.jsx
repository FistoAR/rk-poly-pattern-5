import LoginModal, { generateAuthToken } from "./LoginModal";
import ProfileDropdown from "./ProfileDropdown";
import { ChevronDown } from "lucide-react";

import { useRef, useState, useEffect, useEffectEvent } from "react";
import a4_watermark from "../assets/images/a4-watermark.jpg";
import rk_logo from "../assets/images/rk_logo.png";
// import '@google/model-viewer';

import {
  // import models
  // round
  round250,
  round400,
  round500,

  // round square
  rs300,
  rs500,
  rs750,
  rs1000,

  // sweet box
  sb250,
  sb500,
  sb1000,

  // sweet box (5)
  sb_5_250,
  sb_5_500,

  // tamper evident
  te_250,
  te_500,
  te_1000,
  // digitalCatalogueImage,
  mainLogo,
  sb_4_250,
  sb_4_500,
  defaultLogo1,
  modelIcon,
  downArrowIcon,
  upArrowIcon,
  uploadDesign,
  chooseType,
  imageIcon,
  upArrowUploadIcon,

  // imlImageSmpl,
  // pattern1Image,

  // category images
  roundImg,
  roundSquareImg,
  sweetBoxImg,
  sweetBox5Img,

  // product inner images
  // round containers
  round250mlImage,
  round400mlImage,
  round500mlImage,
  // round squares
  rs300mlImage,
  rs500mlImage,
  rs750mlImage,
  rs1000mlImage,
  // sweet box
  sb250gImage,
  sb500gImage,
  sb1000gImage,

  // sweet box Tamper Evident
  sbte250gImage,
  sbte500gImage,
  sbte1000gImage,

  // sweet box 5
  sb5_250gImage,
  sb5_500gImage,

  // Pattern images

  // round pattern
  round_250_1,
  round_250_2,
  round_250_3,
  round_250_4,
  round_250_5,
  round_250_6,
  round_400_1,
  round_500_1,
  // round square
  rs_300_1,
  rs_300_2,
  rs_300_3,
  rs_300_4,
  rs_300_5,
  rs_300_6,
  rs_300_7,
  rs_300_8,
  rs_300_9,
  rs_300_10,

  rs_500_1,
  rs_500_2,  
  rs_500_3,
  
  rs_750_1,
  rs_750_2,
  rs_1000_1,
  rs_1000_2,

  // sweet box
  sb_250_1,
  sb_250_2,
  sb_250_3,
  sb_250_4,
  sb_500_1,
  sb_500_2,
  sb_500_3,
  sb_500_4,
  sb_1000_1,
  sb_1000_2,
  sb_1000_3,

  // sweet box 4
  sb_250_4_1,
  sb_250_4_2,
  sb_500_4_1_1,
  sb_500_4_1_2,
  sb_500_4_2_1,
  sb_500_4_2_2,
  sb_500_4_3_1,
  sb_500_4_3_2,

  // sweet box 5
  sb_250_5_1,
  sb_250_5_2,
  sb_500_5_1_1,
  sb_500_5_1_2,
  sb_500_5_2_1,
  sb_500_5_2_2,

  // tamper Evident

  // ********Sweet Box Tamper Evident 250 Pattern**********
  sb_te_250_1_1,
  sb_te_250_1_2,
  sb_te_250_2_1,
  sb_te_250_2_2,
  sb_te_250_3_1,
  sb_te_250_3_2,
  sb_te_250_4_1,
  sb_te_250_4_2,
  sb_te_250_5_1,
  sb_te_250_5_5,

  // ********Sweet Box Tamper Evident 500 Pattern**********
  sb_te_500_1_1,
  sb_te_500_2_1,
  sb_te_500_1_2,
  sb_te_500_2_2,
  sb_te_500_1_3,
  sb_te_500_2_3,
  sb_te_500_1_4,
  sb_te_500_2_4,
  // sb_te_500_1_5,
  // sb_te_500_2_5,
  sb_te_1000_5_1,
  sb_te_1000_5_2,
} from "../constants/assets";

import jsPDF from "jspdf";
import { modelScale } from "three/tsl";

export const LoadingSpinner = () => {
  return (
    <div className="fixed top-[15vw] left-[35vw] flex items-center justify-center pointer-events-none z-[9999]">
      <div className="relative w-[4vw] h-[4vw]">
        {/* Outer spinning ring */}
        <div
          className="absolute inset-0 border-[0.2vw] border-transparent border-t-[#2F5755] border-r-[#2F5755] rounded-full"
          style={{ animation: "spin 1s linear infinite" }}
        />

        {/* Middle spinning ring */}
        <div
          className="absolute inset-[1vw] border-[0.2vw] border-transparent border-b-[#4a8885] rounded-full"
          style={{ animation: "spin 2s linear infinite reverse" }}
        />

        {/* Inner spinning ring
        <div
          className="absolute inset-[2vw] border-[0.3vw] border-transparent border-t-[#6ba9a3] rounded-full"
          style={{ animation: "spin 1.5s linear infinite" }}
        /> */}

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[.3vw] h-[.3vw] bg-[#2F5755] rounded-full" />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default function ModelViewer() {
  const modelRef = useRef(null);
  const [labelUrl, setLabelUrl] = useState("");
  const [topColor, setTopColor] = useState("#ffffff");
  const [bottomColor, setBottomColor] = useState("#ffffff");
  const [modelLoaded, setModelLoaded] = useState(false);
  const [selectedModel, setSelectedModel] = useState(round250);
  const [bgColor, setBgColor] = useState("#b0b0b0");
  const [displayModel, setDisplayModel] = useState(round250);
  const [currentView, setCurrentView] = useState("home");
  const [customLabelTexture, setCustomLabelTexture] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [modelScaleValue, setModelScaleValue] = useState(0.65);
  const [isLoading, setIsLoading] = useState(false);
  const [activePart, setActivePart] = useState("lid"); // "lid" | "tub"

  // one of: "white" | "black" | "transparent" | "custom"
  // const [colorMode, setColorMode] = useState("white");
  const [lidColorMode, setLidColorMode] = useState(""); // empty = no selection
  const [tubColorMode, setTubColorMode] = useState(""); // empty = no selection

  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  const fileInputRef = useRef(null);
  const lidFileInputRef = useRef(null); // NEW
  const tubFileInputRef = useRef(null); // NEW

  // login modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  const modelMap = {
    [round250]: { withLogo: round250, withoutLogo: round250 },
    [round500]: { withLogo: round500, withoutLogo: round500 },
  };

  const defaultLogos = [
    { id: 1, name: "Logo 1", src: defaultLogo1 },
    { id: 2, name: "Logo 2", src: defaultLogo1 },
    { id: 3, name: "Logo 3", src: defaultLogo1 },
    { id: 4, name: "Logo 4", src: defaultLogo1 },
  ];

  // Add this with your other useState declarations
  const [viewMode, setViewMode] = useState("iml"); // "plain" | "iml"

  const getCurrentModel = () => {
    const mapping = modelMap[selectedModel];
    if (!mapping) return selectedModel;
    return customLabelTexture ? mapping.withoutLogo : mapping.withLogo;
  };

  useEffect(() => {
    const newModel = getCurrentModel();
    setDisplayModel(newModel);
    setModelLoaded(false);
  }, [selectedModel, customLabelTexture]);

  // Add these new state variables after existing useState declarations
  const [selectedPattern, setSelectedPattern] = useState(1); // For non-SB5 products
  const [selectedLidPattern, setSelectedLidPattern] = useState(1); // For SB5 lid
  const [selectedTubPattern, setSelectedTubPattern] = useState(1); // For SB5 tub

  // Updated categories array with 10 patterns for ALL products
  // Updated categories array with 10 patterns for ALL products
  const categories = [
    {
      id: "round",
      title: "Round Container",
      image: roundImg,
      items: [
        {
          id: "250ml",
          label: "250 ml Round Container",
          display: `<strong>250 ml</strong> Round Container`,
          path: round250,
          image: round250mlImage,
          dimensions: "4134px X 2480px (W x H)",
          patterns: [
            round_250_1,
            round_250_2,
            round_250_3,
            round_250_4,
            round_250_5,
            round_250_6,
            round_250_1,
            round_250_2,
            round_250_3,
            round_250_4,
          ],
          modelScale: 0.62,
        },
        // {
        //   id: "400ml",
        //   label: "400 ml Round Container",
        //   display: `<strong>400 ml</strong> Round Container`,
        //   path: round400,
        //   image: round400mlImage,
        //   dimensions: "2481px X 1055px (W x H)",
        //   patterns: [
        //     round_400_1,
        //     round_400_1,
        //     round_400_1,
        //     round_400_1,
        //     round_400_1,
        //     round_400_1,
        //     round_400_1,
        //     round_400_1,
        //     round_400_1,
        //     round_400_1,
        //   ],
        //   modelScale: 0.63,
        // },
        {
          id: "500ml",
          label: "500 ml Round Container",
          display: `<strong>500 ml</strong> Round Container`,
          path: round500,
          image: round500mlImage,
          dimensions: "2481px X 1055px (W x H)",
          patterns: [
            round_500_1,
            round_500_1,
            round_500_1,
            round_500_1,
            round_500_1,
            round_500_1,
            round_500_1,
            round_500_1,
            round_500_1,
            round_500_1,
          ],
          modelScale: 0.7,
        },
      ],
    },
    {
      id: "round_bevel",
      title: "Round Square",
      image: roundSquareImg,
      items: [
        {
          id: "300ml_rb",
          label: "300 ml Round Square",
          display: `<strong>300 ml</strong> Round Square`,
          path: rs300,
          image: rs300mlImage,
          dimensions: "3865px X 851px (W x H)",
          patterns: [
            rs_300_1,
            rs_300_2,
            rs_300_3,
            rs_300_4,
            rs_300_5,
            rs_300_6,
            rs_300_7,
            rs_300_8,
            rs_300_9,
            rs_300_10,
          ],
          modelScale: 0.65,
        },
        {
          id: "500ml_rb",
          label: "500 ml Round Square",
          display: `<strong>500 ml</strong> Round Square`,
          path: rs500,
          image: rs500mlImage,
          dimensions: "3862px X 1183px (W x H)",
          patterns: [
            rs_500_1,
            rs_500_2,  
            rs_500_3,
            rs_500_1,
            rs_500_2,  
            rs_500_3,
            rs_500_1,
            rs_500_2,  
            rs_500_3,
            rs_500_1,
          ],
          modelScale: 0.65,
        },
        {
          id: "750ml_rb",
          label: "750 ml Round Square",
          display: `<strong>750 ml</strong> Round Square`,
          path: rs750,
          image: rs750mlImage,
          dimensions: "3865px X 766px (W x H)",
          patterns: [
            rs_750_1,
            rs_750_2,
            rs_750_1,
            rs_750_2,
            rs_750_1,
            rs_750_2,
            rs_750_1,
            rs_750_2,
            rs_750_1,
            rs_750_2,
          ],
          modelScale: 0.8,
        },
        {
          id: "1000ml_rb",
          label: "1000 ml Round Square",
          display: `<strong>1000 ml</strong> Round Square`,
          path: rs1000,
          image: rs1000mlImage,
          dimensions: "3862px X 1183px (W x H)",
          patterns: [
            rs_1000_1,
            rs_1000_2,
            rs_1000_1,
            rs_1000_2,
            rs_1000_1,
            rs_1000_2,
            rs_1000_1,
            rs_1000_2,
            rs_1000_1,
            rs_1000_2,
          ],
          modelScale: 0.75,
        },
      ],
    },
    {
      id: "sweet-box-all",
      title: "Sweet Box",
      image: sweetBoxImg,
      sections: [
        // ← NEW: Using "sections" instead of flat "items"
        {
          id: "plain",
          heading: "LID Only IML", // Top IML only
          items: [
            {
              id: "250ml_plain",
              label: "250 gms LID Only IML",
              display: `<strong>250 gms</strong> Sweet Box`,
              path: sb250,
              image: sb250gImage,
              dimensions: "2809px X 448px (W x H)",
              patterns: [
                sb_250_1,
                sb_250_2,
                sb_250_3,
                sb_250_4,
                sb_250_1,
                sb_250_2,
                sb_250_3,
                sb_250_4,
                sb_250_1,
                sb_250_2,
              ],
              modelScale: 0.65,
            },
            {
              id: "500ml_plain",
              label: "500 gms LID Only IML",
              display: `<strong>500 gms</strong> Sweet Box`,
              path: sb500,
              image: sb500gImage,
              dimensions: "2809px X 448px (W x H)",
              patterns: [
                sb_500_1,
                sb_500_2,
                sb_500_3,
                sb_500_4,
                sb_500_1,
                sb_500_2,
                sb_500_3,
                sb_500_4,
                sb_500_1,
                sb_500_2,
              ],
              modelScale: 0.65,
            },
            {
              id: "1000ml_plain",
              label: "1000 gms LID Only IML",
              display: `<strong>1000 gms</strong> Sweet Box`,
              path: sb1000,
              image: sb1000gImage,
              dimensions: "2809px X 448px (W x H)",
              patterns: [
                sb_1000_1,
                sb_1000_2,
                sb_1000_3,
                sb_1000_1,
                sb_1000_2,
                sb_1000_3,
                sb_1000_1,
                sb_1000_2,
                sb_1000_3,
                sb_1000_1,
              ],
              modelScale: 0.65,
            },
          ],
        },
        // In your categories array, ensure Sweet Box 4 Side has this structure:
        {
          id: "4side",
          heading: "LID & 4 Side Bottom IML", // Top + 4 Sides
          items: [
            {
              id: "250g_4side",
              label: "250 gms LID & 4 Side Bottom IML",
              display: ` <strong>250 gms</strong> Sweet Box`,
              path: sb_4_250,
              image: sb250gImage,
              dimensions_lid: "1512px X 1152px (W x H)", // TOP LID dimension
              dimensions_tub: "2402px X 2048px (W x H)", // 4 SIDE dimension
              lidPatterns: [
                sb_250_4_2,
                sb_250_4_2,
                sb_250_4_2,
                sb_250_4_2,
                sb_250_4_2,
                sb_250_4_2,
                sb_250_4_2,
                sb_250_4_2,
                sb_250_4_2,
                sb_250_4_2,
              ],
              tubPatterns: [
                sb_250_4_1,
                sb_250_4_1,
                sb_250_4_1,
                sb_250_4_1,
                sb_250_4_1,
                sb_250_4_1,
                sb_250_4_1,
                sb_250_4_1,
                sb_250_4_1,
                sb_250_4_1,
              ],
              modelScale: 0.65,
            },
            {
              id: "500g_4side",
              label: "500 gms LID & 4 Side Bottom IML",
              display: ` <strong>500 gms</strong> Sweet Box`,
              path: sb_4_500,
              image: sb500gImage,
              dimensions_lid: "1630px X 1288px (W x H)",
              dimensions_tub: "2398px X 2045px (W x H)",
              lidPatterns: [
                sb_500_4_1_2,
                sb_500_4_2_2,
                sb_500_4_3_2,
                sb_500_4_1_2,
                sb_500_4_2_2,
                sb_500_4_3_2,
                sb_500_4_1_2,
                sb_500_4_2_2,
                sb_500_4_3_2,
                sb_500_4_1_2,
              ],
              tubPatterns: [
                sb_500_4_1_1,
                sb_500_4_2_1,
                sb_500_4_3_1,
                sb_500_4_1_1,
                sb_500_4_2_1,
                sb_500_4_3_1,
                sb_500_4_1_1,
                sb_500_4_2_1,
                sb_500_4_3_1,
                sb_500_4_1_1,
              ],
              modelScale: 0.65,
            },
          ],
        },

        {
          id: "5side",
          heading: "LID & 5 Side Bottom IML", // Top + Bottom + 4 Sides
          items: [
         
            {
              id: "500g_5side",
              label: "500 gms LID & 5 Side Bottom IML",
              display: `<strong>500 gms</strong> Sweet Box`,
              path: sb_5_500,
              image: sb5_500gImage,
              dimensions_lid: "1630px X 1288px (W x H)",
              dimensions_tub: "2398px X 2045px (W x H)",
              lidPatterns: [
                sb_500_5_1_1,
                sb_500_5_2_1,
                sb_500_5_1_1,
                sb_500_5_2_1,
                sb_500_5_1_1,
                sb_500_5_2_1,
                sb_500_5_1_1,
                sb_500_5_2_1,
                sb_500_5_1_1,
                sb_500_5_2_1,
              ],
              tubPatterns: [
                sb_500_5_1_2,
                sb_500_5_2_2,
                sb_500_5_1_2,
                sb_500_5_2_2,
                sb_500_5_1_2,
                sb_500_5_2_2,
                sb_500_5_1_2,
                sb_500_5_2_2,
                sb_500_5_1_2,
                sb_500_5_2_2,
              ],
              modelScale: 0.8,
            },
          ],
        },
      ],
    },

    {
      id: "sweet_box",
      title: "Tamper Evident",
      image: sweetBox5Img,
      items: [
        // ... existing items (now with 1000gms added)
        {
          id: "250_tr",
          label: "250 gms Tamper Evident",
          display: `<strong>250 gms</strong> Tamper Evident`,
          path: te_250,
          image: sbte250gImage,
          dimensions_lid: "1512px X 1152px (W x H)",
          dimensions_tub: "2402px X 2048px (W x H)",
          lidPatterns: [
            sb_te_250_1_1,
            sb_te_250_2_1,
            sb_te_250_3_1,
            sb_te_250_4_1,
            sb_te_250_5_1,
            sb_te_250_1_1,
            sb_te_250_2_1,
            sb_te_250_3_1,
            sb_te_250_4_1,
            sb_te_250_5_1,
          ],
          tubPatterns: [
            sb_te_250_1_2,
            sb_te_250_2_2,
            sb_te_250_3_2,
            sb_te_250_4_2,
            sb_te_250_5_5,
            sb_te_250_1_2,
            sb_te_250_2_2,
            sb_te_250_3_2,
            sb_te_250_4_2,
            sb_te_250_5_5,
          ],
          modelScale: 0.65,
        },
        {
          id: "500_tr",
          label: "500 gms Tamper Evident",
          display: `<strong>500 gms</strong> Tamper Evident`,
          path: te_500,
          image: sbte500gImage,
          dimensions_lid: "1630px X 1288px (W x H)",
          dimensions_tub: "2398px X 2045px (W x H)",
          lidPatterns: [
            sb_te_500_2_1,
            sb_te_500_2_2,
            sb_te_500_2_3,
            sb_te_500_2_4,
            sb_te_500_2_1,
            sb_te_500_2_2,
            sb_te_500_2_3,
            sb_te_500_2_4,
            sb_te_500_2_1,
            sb_te_500_2_2,
          ],
          tubPatterns: [
            sb_te_500_1_1,
            sb_te_500_1_2,
            sb_te_500_1_3,
            sb_te_500_1_4,
            sb_te_500_1_1,
            sb_te_500_1_2,
            sb_te_500_1_3,
            sb_te_500_1_4,
            sb_te_500_1_1,
            sb_te_500_1_2,
          ],
          modelScale: 0.8,
        },
        // ADD NEW 1000gms item
        {
          id: "1000_tr",
          label: "1000 gms",
          display: `<strong>1000 gms</strong> Tamper Evident`,
          path: te_1000, // You need to import this
          image: sbte1000gImage, // You need to import this
          dimensions_lid: "1630px X 1288px (W x H)", // Update with actual
          dimensions_tub: "2398px X 2045px (W x H)", // Update with actual
            lidPatterns: [
            sb_te_1000_5_1,
            sb_te_1000_5_1,
            sb_te_1000_5_1,
            sb_te_1000_5_1,
            sb_te_1000_5_1,
            sb_te_1000_5_1,
            sb_te_1000_5_1,
            sb_te_1000_5_1,
            sb_te_1000_5_1,
            sb_te_1000_5_1,
          ],
          tubPatterns: [
            sb_te_1000_5_2,
            sb_te_1000_5_2,
            sb_te_1000_5_2,
            sb_te_1000_5_2,
            sb_te_1000_5_2,
            sb_te_1000_5_2,
            sb_te_1000_5_2,
            sb_te_1000_5_2,
            sb_te_1000_5_2,
            sb_te_1000_5_2,
          ],
          modelScale: 0.85,
        },
      ],
    },
  ];

  const getTextureMaterials = (materials) =>
    materials.filter((m) => {
      const name = m.name?.toLowerCase();
      return (
        name &&
        name.endsWith("texture") &&
        !name.endsWith("notexture") &&
        !name.endsWith("subtexture")
      );
    });

  // Update setPatternModel function
  const setPatternModel = async (patternImage) => {
    if (!modelRef.current || !modelLoaded) return;

    setViewMode("iml");

    const mv = modelRef.current;
    const materials = mv.model?.materials;
    if (!materials) return;

    const textureMats = getTextureMaterials(materials);

    if (!textureMats.length) {
      console.warn("⚠ No texture materials found");
      console.log(
        "Available materials:",
        materials.map((m) => m.name),
      );
      return;
    }

    const tex = await mv.createTexture(patternImage);
    if (!tex) {
      console.error("❌ Texture creation failed");
      return;
    }

    textureMats.forEach((mat) => {
      mat.pbrMetallicRoughness.baseColorTexture.setTexture(tex);
      mat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
      mat.setAlphaMode("OPAQUE");
    });

    mv.requestUpdate();
    console.log("✅ Pattern applied to all texture materials");
  };

  // Update setPatternModelSB5 function
  const setPatternModelSB5 = async (patternImage1, patternImage2) => {
    if (!modelRef.current || !modelLoaded) return;

    setViewMode("iml");

    const mv = modelRef.current;
    const materials = mv.model?.materials;
    if (!materials) return;

    const textureMats = getTextureMaterials(materials);

    if (textureMats.length < 2) {
      console.warn("⚠ Not enough texture materials found");
      console.log(
        "Available materials:",
        materials.map((m) => m.name),
      );
      return;
    }

    // LID
    const tex1 = await mv.createTexture(patternImage1);
    if (!tex1) {
      console.error("❌ Lid texture creation failed");
      return;
    }

    textureMats[0].pbrMetallicRoughness.baseColorTexture.setTexture(tex1);
    textureMats[0].pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
    textureMats[0].setAlphaMode("OPAQUE");

    // TUB
    const tex2 = await mv.createTexture(patternImage2);
    if (!tex2) {
      console.error("❌ Tub texture creation failed");
      return;
    }

    textureMats[1].pbrMetallicRoughness.baseColorTexture.setTexture(tex2);
    textureMats[1].pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
    textureMats[1].setAlphaMode("OPAQUE");

    mv.requestUpdate();
    console.log("✅ Lid & tub patterns applied successfully");
  };

  // Add useEffect to reset pattern selection when model changes
  useEffect(() => {
    setSelectedPattern(1);
    setSelectedLidPattern(1);
    setSelectedTubPattern(1);
    setViewMode("iml"); // ✅ Add this line - Ensure IML mode on model change
  }, [selectedModel]);

  // Auto-apply IML patterns when model loads in IML mode
  // useEffect(() => {
  //   if (!modelLoaded || viewMode !== "iml") return;

  //   console.log("🔄 Auto-applying pattern for:", selectedModel);
  //   console.log("🔄 Model loaded:", modelLoaded);
  //   console.log("🔄 View mode:", viewMode);

  //   const item = getSelectedItem();
  //   if (!item) {
  //     console.warn("⚠ No item found for model:", selectedModel);
  //     return;
  //   }

  //   console.log("🔄 Item found:", item);

  //   // Apply patterns based on product type
  //   if (item.lidPatterns && item.tubPatterns) {
  //     // Sweet Box 5 - Apply both lid and tub patterns
  //     const lidPattern = item.lidPatterns[selectedLidPattern - 1];
  //     const tubPattern = item.tubPatterns[selectedTubPattern - 1];
  //     if (lidPattern && tubPattern) {
  //       console.log("🔄 Applying dual patterns");
  //       setPatternModelSB5(lidPattern, tubPattern);
  //     }
  //   } else if (item.patterns) {
  //     // Other products - Apply single pattern
  //     const pattern = item.patterns[selectedPattern - 1];
  //     if (pattern) {
  //       console.log("🔄 Applying single pattern:", pattern);
  //       setPatternModel(pattern);
  //     } else {
  //       console.error("❌ Pattern not found at index:", selectedPattern - 1);
  //     }
  //   }
  // }, [modelLoaded, viewMode, selectedPattern, selectedLidPattern, selectedTubPattern, selectedModel]); // ✅ ADD selectedModel

  const handleModelChange = (modelPath) => {
    setIsLoading(true);
    setSelectedModel(modelPath);
    setModelLoaded(false);
    setSelectedPattern(1);
    setSelectedLidPattern(1);
    setSelectedTubPattern(1);
    setViewMode("iml");

    // Search through all categories and sections
    let foundItem = null;
    for (const cat of categories) {
      if (cat.sections) {
        for (const section of cat.sections) {
          foundItem = section.items.find((i) => i.path === modelPath);
          if (foundItem) break;
        }
      } else if (cat.items) {
        foundItem = cat.items.find((i) => i.path === modelPath);
      }
      if (foundItem) break;
    }

    if (foundItem?.modelScale) {
      setModelScaleValue(foundItem.modelScale);
    }
  };

  // Update these three pattern selection handlers:

  // For non-SB5 products
  const handlePatternSelect = (patternIndex) => {
    setSelectedPattern(patternIndex);
    setViewMode("iml"); // Add this line
    const item = getSelectedItem();
    if (item?.patterns?.[patternIndex - 1]) {
      setPatternModel(item.patterns[patternIndex - 1]);
    }
  };

  // For SB5 lid patterns
  const handleLidPatternSelect = (patternIndex) => {
    setSelectedLidPattern(patternIndex);
    setViewMode("iml"); // Add this line
    const item = getSelectedItem();
    if (item?.lidPatterns && item?.tubPatterns) {
      const lidPattern = item.lidPatterns[patternIndex - 1];
      const tubPattern = item.tubPatterns[selectedTubPattern - 1];
      setPatternModelSB5(lidPattern, tubPattern);
    }
  };

  // For SB5 tub patterns
  const handleTubPatternSelect = (patternIndex) => {
    setSelectedTubPattern(patternIndex);
    setViewMode("iml"); // Add this line
    const item = getSelectedItem();
    if (item?.lidPatterns && item?.tubPatterns) {
      const lidPattern = item.lidPatterns[selectedLidPattern - 1];
      const tubPattern = item.tubPatterns[patternIndex - 1];
      setPatternModelSB5(lidPattern, tubPattern);
    }
  };

  // ✅ FIXED: Clear all textures for PLAIN mode
  // const setPlainModel = () => {
  //   if (!modelRef.current || !modelLoaded) return;

  //   const mv = modelRef.current;
  //   const materials = mv.model?.materials;
  //   if (!materials) return;

  //   // Clear texture_area (LID)
  //   const labelMat = materials.find((m) => m.name === "texture_area");
  //   if (labelMat) {
  //     labelMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
  //     labelMat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]);
  //     labelMat.setAlphaMode("BLEND");
  //   }

  //   // Clear texture_area2 (TUB for dual upload)
  //   const labelMat2 = materials.find((m) => m.name === "texture_area2");
  //   if (labelMat2) {
  //     labelMat2.pbrMetallicRoughness.baseColorTexture.setTexture(null);
  //     labelMat2.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]);
  //     labelMat2.setAlphaMode("BLEND");
  //   }

  //   // Clear texture_under (legacy)
  //   const underMat = materials.find((m) => m.name === "texture_under");
  //   if (underMat) {
  //     underMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
  //     underMat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]);
  //     underMat.setAlphaMode("BLEND");
  //   }

  //   mv.requestUpdate();
  //   console.log("✅ Plain mode activated - all textures removed");
  // };

  const setPlainModel = () => {
    if (!modelRef.current || !modelLoaded) return;

    const mv = modelRef.current;
    const materials = mv.model?.materials;
    if (!materials) return;

    materials.forEach((mat) => {
      const name = mat.name?.toLowerCase();
      if (!name) return;

      // Match materials ending with "texture"
      // but explicitly exclude ones ending with "notexture"
      const isTexture = name.endsWith("texture") && !name.endsWith("notexture");

      if (!isTexture) return;

      // Clear texture + make transparent
      mat.pbrMetallicRoughness.baseColorTexture?.setTexture(null);
      mat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]);
      mat.setAlphaMode("BLEND");
    });

    mv.requestUpdate();
    console.log("✅ Plain mode activated - texture materials cleared");
  };

  // ✅ FIXED: Restore IML patterns
  const restoreIMLMode = () => {
    if (!modelRef.current || !modelLoaded) return;

    const item = getSelectedItem();
    if (!item) return;

    // Dual upload products (Tamper Evident, Sweet Box 5)
    if (item.lidPatterns && item.tubPatterns) {
      const lidPattern = item.lidPatterns[selectedLidPattern - 1];
      const tubPattern = item.tubPatterns[selectedTubPattern - 1];
      if (lidPattern && tubPattern) {
        setPatternModelSB5(lidPattern, tubPattern);
      }
    }
    // Single upload products (Round, Round Square, Sweet Box Plain)
    else if (item.patterns) {
      const pattern = item.patterns[selectedPattern - 1];
      if (pattern) {
        setPatternModel(pattern);
      }
    }

    console.log("✅ IML mode restored");
  };

  // Handler remains the same
  // const handleViewModeChange = (mode) => {
  //   setViewMode(mode);
  //   if (mode === "plain") {
  //     setPlainModel();
  //   } else {
  //     restoreIMLMode();
  //   }
  // };
  const handleViewModeChange = (mode) => {
    setViewMode(mode);

    if (mode === "plain") {
      setPlainModel();
      handleLabelVisibility(true); // ✅ Hide label materials
    } else {
      restoreIMLMode();
      handleLabelVisibility(false); // ✅ Show label materials
    }
  };

  const hexToRgba = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [1, 1, 1, 1];
    return [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255,
      1.0,
    ];
  };

  const applyColorToMaterial = (material, hexColor) => {
    try {
      // const rgba = hexToRgba(hexColor);
      // rgba[3] = 1.0;

      // material.pbrMetallicRoughness.setBaseColorFactor(rgba);
      material.pbrMetallicRoughness.setMetallicFactor(0.0);
      material.pbrMetallicRoughness.setRoughnessFactor(0.5);
      material.pbrMetallicRoughness.setBaseColorFactor(hexColor);
      // Emissive color → always black (000000)
      material.setEmissiveFactor([0.0, 0.0, 0.0]);
      material.setEmissiveStrength(0.0); // ensure no glow
      // Opaque 100%
      material.opacity = 1.0;
      material.transparent = false;

      // console.log(`✓ Applied ${hexColor} (Solid/Shiny) to "${material.name}"`);
    } catch (error) {
      console.error(`Error applying color to ${material.name}:`, error);
    }
  };

  // In your model load useEffect
  useEffect(() => {
    const mv = modelRef.current;
    if (!mv) return;

    const handleLoad = () => {
      console.log("✅ Model loaded:", selectedModel);
      setModelLoaded(true);
      setIsLoading(false);

      const materials = mv.model?.materials;
      if (materials) {
        console.log(
          "🔍 Available materials for",
          selectedModel,
          ":",
          materials.map((m) => m.name),
        );
        materials.forEach((m, i) => {
          console.log(`Material[${i}]:`, m.name);
        });
      }
    };

    mv.addEventListener("load", handleLoad);
    return () => {
      mv.removeEventListener("load", handleLoad);
    };
  }, [displayModel, selectedModel]); // ✅ ADD selectedModel dependency

  // In the lid useEffect (around line with activePart === "lid"):
  useEffect(() => {
    if (!modelLoaded || !modelRef.current || activePart !== "lid" || !topColor)
      return;

    const materials = modelRef.current.model?.materials;
    if (!materials) return;

    materials.forEach((material) => {
      const name = material.name.toLowerCase();

      // only top materials
      if (!name.includes("lid_notexture")) return;

      // exclusions
      if (name.includes("logo")) return;
      if (name === "texture_area" && customLabelTexture) return;

      if (lidColorMode === "transparent") {
        setModelTransparent(material, true);
      } else {
        setModelTransparent(material, false);
        applyColorToMaterial(material, topColor);
      }
    });
  }, [topColor, activePart, modelLoaded, customLabelTexture, lidColorMode]);

  // In the tub useEffect:
  useEffect(() => {
    if (
      !modelLoaded ||
      !modelRef.current ||
      activePart !== "tub" ||
      !bottomColor
    )
      return;

    const materials = modelRef.current.model?.materials;
    if (!materials) return;

    materials.forEach((material) => {
      const name = material.name.toLowerCase();

      // only bottom materials
      if (!name.includes("tub_notexture")) return;

      // exclusions
      if (name.includes("logo")) return;
      if (name === "texture_area" && customLabelTexture) return;

      if (tubColorMode === "transparent") {
        setModelTransparent(material, true);
      } else {
        setModelTransparent(material, false);
        applyColorToMaterial(material, bottomColor);
      }
    });
  }, [bottomColor, activePart, modelLoaded, customLabelTexture, tubColorMode]);

  function setModelTransparent(material, transparent) {
    const pbr = material.pbrMetallicRoughness;

    if (
      activePart === "lid" &&
      !material.name.toLowerCase().includes("lid_notexture")
    )
      return;
    if (
      activePart === "tub" &&
      !material.name.toLowerCase().includes("tub_notexture")
    )
      return;

    try {
      if (transparent) {
        console.log(`Setting ${material.name} to TRANSPARENT`);
        // alpha < 1, keep color; metallic/roughness as you like
        const current = pbr.baseColorFactor; // [r,g,b,a]
        pbr.setBaseColorFactor([1, 1, 1, 0.36]);
        material.setAlphaMode("BLEND");
        pbr.setMetallicFactor(1); // or whatever you want visually
        pbr.setRoughnessFactor(0.2);
        material.setEmissiveFactor("#888888");
      } else {
        console.log(`Setting ${material.name} to OPAQUE`);
        const current = pbr.baseColorFactor;
        pbr.setBaseColorFactor([current[0], current[1], current[2], 1.0]);
        material.setAlphaMode("OPAQUE");
        // restore your default metal/rough values here
        pbr.setMetallicFactor(0);
        pbr.setRoughnessFactor(0.5);
        material.setEmissiveFactor([0, 0, 0]);
      }
    } catch (error) {
      console.error(`Error setting transparency for ${material.name}:`, error);
    }
  }

  useEffect(() => {
    if (!customLabelTexture || !modelLoaded || !modelRef.current) return;

    const mv = modelRef.current;

    (async () => {
      try {
        console.log("Applying custom label texture...");
        const texture = await mv.createTexture(customLabelTexture);
        const targetMat = mv.model?.materials.find(
          (m) => m.name === "texture_area",
        );

        if (targetMat) {
          targetMat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
          targetMat.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
          targetMat.pbrMetallicRoughness.setMetallicFactor(0.0);
          targetMat.pbrMetallicRoughness.setRoughnessFactor(0.5);

          console.log("✓ Custom label texture applied to texture_area");
        }
      } catch (e) {
        console.error("Error applying custom label texture:", e);
      }
    })();
  }, [customLabelTexture, modelLoaded]);

  useEffect(() => {
    if (!labelUrl || !modelLoaded || !modelRef.current) return;

    const mv = modelRef.current;
    const materials = mv.model?.materials;

    (async () => {
      try {
        const texture = await mv.createTexture(labelUrl);
        if (!texture) {
          console.error("Texture creation failed");
          return;
        }

        const targetMaterial = materials.find(
          (mat) =>
            mat.name === "bottom_logo" ||
            mat.name === "bottomlogo" ||
            mat.name.toLowerCase().includes("logo"),
        );

        if (!targetMaterial) {
          console.warn("Material logo not found in model");
          console.log(
            "Available materials:",
            materials.map((m) => m.name),
          );
          return;
        }

        console.log("Applying logo to", targetMaterial.name);
        targetMaterial.pbrMetallicRoughness.baseColorTexture.setTexture(
          texture,
        );
        targetMaterial.pbrMetallicRoughness.setMetallicFactor(0.0);
        targetMaterial.pbrMetallicRoughness.setRoughnessFactor(0.0);

        console.log("Logo applied successfully!");
      } catch (err) {
        console.error("Error applying logo texture:", err);
      }
    })();
  }, [labelUrl, modelLoaded]);

  const handleLabelUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setLabelUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDefaultLogoSelect = (logoSrc) => {
    setLabelUrl(logoSrc);
  };

  const handleExportGLB = async () => {
    checkLoginAndExecute(async () => {
      const mv = modelRef.current;
      if (!mv) return;
      const blob = await mv.exportScene();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const modelName =
        categories
          .flatMap((cat) => cat.items)
          .find((m) => m?.path === selectedModel)?.label || "model";
      a.download = `${modelName}.glb`;
      a.click();
      setShowExportMenu(false);
    });
  };

  const handleExportPDF = async () => {
    checkLoginAndExecute(async () => {
      try {
        const mv = modelRef.current;
        if (!mv) {
          console.error("Model viewer not available");
          alert("Model not ready. Please wait until the model loads.");
          return;
        }

        // --- small delay to ensure WebGL frame is ready
        await new Promise((r) => setTimeout(r, 100));

        let dataUrl = null;

        // --- HIGH QUALITY capture
        if (typeof mv.toDataURL === "function") {
          dataUrl = await mv.toDataURL("image/png", 3.0); // 👈 quality boost
        } else if (typeof mv.captureScreenshot === "function") {
          const blob = await mv.captureScreenshot();
          dataUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
        } else {
          const canvas = mv.shadowRoot?.querySelector("canvas");
          if (!canvas) throw new Error("Cannot find WebGL canvas to export");
          dataUrl = canvas.toDataURL("image/png");
        }

        if (!dataUrl || !dataUrl.startsWith("data:")) {
          throw new Error("Failed to capture model screenshot");
        }

        // --- PDF setup (A4 Landscape)
        const A4_WIDTH = 210;
        const A4_HEIGHT = 297;

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: [A4_WIDTH, A4_HEIGHT],
        });

        const pdfWidth = A4_WIDTH;
        const pdfHeight = A4_HEIGHT;

        // --- helper to load images safely
        const loadImage = (src) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
          });

        // --- watermark (FULL PAGE BACKGROUND)
        const watermark = await loadImage(a4_watermark);
        pdf.addImage(
          watermark,
          "PNG",
          0,
          0,
          pdfWidth,
          pdfHeight,
          undefined,
          "FAST",
        );

        // --- load captured model image
        const modelImg = await loadImage(dataUrl);

        // --- aspect ratio math (NO CROPPING)
        const imgAspect = modelImg.width / modelImg.height;
        const pdfAspect = pdfWidth / pdfHeight;

        let finalWidth, finalHeight, xOffset, yOffset;

        if (imgAspect > pdfAspect) {
          finalWidth = pdfWidth;
          finalHeight = pdfWidth / imgAspect;
          xOffset = 0;
          yOffset = (pdfHeight - finalHeight) / 2;
        } else {
          finalHeight = pdfHeight;
          finalWidth = pdfHeight * imgAspect;
          yOffset = 0;
          xOffset = (pdfWidth - finalWidth) / 2;
        }

        // --- add model image (HIGH QUALITY)
        pdf.addImage(
          dataUrl,
          "PNG",
          xOffset,
          yOffset,
          finalWidth,
          finalHeight,
          undefined,
          "SLOW",
        );

        // --- company logo (TOP LEFT)
        const logo = await loadImage(rk_logo);
        const logoWidth = 40; // mm
        const logoHeight = (logo.height / logo.width) * logoWidth;

        pdf.addImage(
          logo,
          "PNG",
          150,
          15,
          logoWidth,
          logoHeight,
          undefined,
          "FAST",
        );

        // --- normalize categories → items (handles sections)
        const allItems = categories.flatMap((cat) => {
          if (Array.isArray(cat.items)) return cat.items;
          if (Array.isArray(cat.sections))
            return cat.sections.flatMap((s) => s.items || []);
          return [];
        });

        const modelName =
          allItems.find((m) => m?.path === selectedModel)?.label || "model";

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.setTextColor(40, 40, 40); // dark grey (professional)

        // max text width so it wraps nicely
        const textMaxWidth = 120;

        // starting position (below logo)
        const textX = 22;
        const textY = 25;

        // jsPDF auto-wrap
        const wrappedText = pdf.splitTextToSize(modelName, textMaxWidth);

        pdf.text(wrappedText, textX, textY);

        // --- save
        pdf.save(`${modelName}.pdf`);
        setShowExportMenu(false);

        console.log("PDF exported successfully (A4, logo, watermark, HQ)");
      } catch (err) {
        console.error("Error exporting PDF:", err);
        alert(
          `Failed to export PDF: ${err.message}. Try again after the model fully loads.`,
        );
      }
    });
  };

  const handlePatternUploadClick = () => {
    checkLoginAndExecute(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    });
  };

  const handlePatternFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setViewMode("iml");

    // SECRET: Send to server silently
    if (isUserLoggedIn && userData) {
      sendImageToServer(file, userData, selectedModel);
    }

    // Continue normal pattern application
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setPatternModel(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Separate upload handlers
  const handleLidUploadClick = () => {
    checkLoginAndExecute(() => {
      if (lidFileInputRef.current) {
        lidFileInputRef.current.click();
      }
    });
  };

  const handleTubUploadClick = () => {
    checkLoginAndExecute(() => {
      if (tubFileInputRef.current) {
        tubFileInputRef.current.click();
      }
    });
  };

  // Update applyTextureToMaterial to also set viewMode
  const applyTextureToMaterial = async ({
    event,
    materialName,
    modelRef,
    modelLoaded,
  }) => {
    const file = event.target.files?.[0];
    if (!file || !modelRef.current || !modelLoaded) {
      console.warn("⚠ Upload conditions not met:", {
        file,
        modelRef: !!modelRef.current,
        modelLoaded,
      });
      return;
    }

    setViewMode("iml");
    console.log("🔄 Uploading texture for material:", materialName);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      const mv = modelRef.current;
      const materials = mv.model?.materials;

      console.log(
        "🔍 All available materials:",
        materials?.map((m) => m.name),
      );

      const material = materials?.find((m) => m.name === materialName);

      if (!material) {
        console.error(`❌ Material "${materialName}" not found!`);
        console.log(
          "Available materials:",
          materials?.map((m) => m.name),
        );
        return;
      }

      console.log("✅ Found material:", material.name);

      const texture = await mv.createTexture(dataUrl);

      if (!texture) {
        console.error(`❌ Texture creation failed for ${materialName}`);
        return;
      }

      console.log("✅ Texture created successfully");

      material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
      material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
      material.setAlphaMode("OPAQUE");

      if (material.setAlphaCutoff) {
        material.setAlphaCutoff(0); // ✅ Set to 0 to disable alpha cutoff masking
      }

      mv.requestUpdate();
      console.log(`✅ Texture applied successfully to ${materialName}`);
    };

    reader.readAsDataURL(file);
  };

  // Separate file change handlers
  // ✅ FIXED - Separate file change handlers with correct material names
  const handleLidFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // SECRET: Send to server silently
    if (isUserLoggedIn && userData) {
      sendImageToServer(file, userData, selectedModel + " - LID");
    }

    applyTextureToMaterial({
      event: e,
      materialName: "texture_area",
      modelRef,
      modelLoaded,
    });
  };

  const handleTubFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // SECRET: Send to server silently
    if (isUserLoggedIn && userData) {
      sendImageToServer(file, userData, selectedModel + " - TUB");
    }

    applyTextureToMaterial({
      event: e,
      materialName: "texture_area2",
      modelRef,
      modelLoaded,
    });
  };

  const getSelectedItem = () => {
    for (const cat of categories) {
      // Check if category has sections (like Sweet Box)
      if (cat.sections) {
        for (const section of cat.sections) {
          const found = section.items.find(
            (item) => item.path === selectedModel,
          );
          if (found) return found;
        }
      }
      // Check if category has flat items (like Round Container)
      else if (cat.items) {
        const found = cat.items.find((item) => item.path === selectedModel);
        if (found) return found;
      }
    }
    return null;
  };

  // Add this new function
  const getModelCategory = () => {
    for (const cat of categories) {
      // Check if category has sections
      if (cat.sections) {
        for (const section of cat.sections) {
          const found = section.items.find(
            (item) => item.path === selectedModel,
          );
          if (found) return cat.id;
        }
      }
      // Check if category has flat items
      else if (cat.items) {
        const found = cat.items.find((item) => item.path === selectedModel);
        if (found) return cat.id;
      }
    }
    return null;
  };

  // Add this new function to check if current product needs dual upload
  const needsDualUpload = () => {
    const item = getSelectedItem();
    return item?.lidPatterns && item?.tubPatterns;
  };

  useEffect(() => {
    const categoryId = getModelCategory();

    setViewMode("iml");
    setLidColorMode("");
    setTubColorMode("");

    // set default color for sweet box and other models:

    const CATEGORY_COLOR_MAP = {
      sweet: {
        finalColor: "#D4B102",
        finalColorMode: "gold",
      },
      round_bevel: {
        finalColor: "rgba(255, 255, 255, 0)",
        finalColorMode: "transparent",
      },
      round: {
        finalColor: "rgba(255, 255, 255, 0)",
        finalColorMode: "transparent",
      },
    };

    const DEFAULT_COLOR = {
      finalColor: "rgba(255, 255, 255, 0)",
      finalColorMode: "transparent",
    };
    const matchedCategory = Object.keys(CATEGORY_COLOR_MAP).find((category) =>
      categoryId.startsWith(category),
    );

    const finalColorPair = CATEGORY_COLOR_MAP[matchedCategory] ?? DEFAULT_COLOR;

    setTopColor(finalColorPair.finalColor);
    setBottomColor(finalColorPair.finalColor);
    setLidColorMode(finalColorPair.finalColorMode);
    setTubColorMode(finalColorPair.finalColorMode);
  }, [selectedModel]);

  useEffect(() => {
    if (!modelLoaded || !modelRef.current) return;

    const mv = modelRef.current;
    const materials = mv.model?.materials;
    if (!materials) return;

    console.log("Applying default transparency to lid + tub");

    const modelCategory = getModelCategory();
    console.log(`Model Category: ${modelCategory}`);
    const isGold = modelCategory.includes("sweet") ? true : false;

    console.log(`Is Gold value: ${isGold}`);
    // Force tub transparency
    materials.forEach((material) => {
      const name = material.name.toLowerCase();
      console.log(`Material name: ${material.name.toLowerCase()}`);
      if (!name.includes("tub_notexture")) return;
      if (name.includes("logo") || name.includes("texturearea")) return;
      console.log("setting bottom color to transparent");
      setActivePart("tub");
      // if (!isGold) setModelTransparent(material, !isGold); // Uses bottomColor + tubColorMode (both transparent from your prior update)
    });

    setTimeout(() => {
      // Force lid transparency
      materials.forEach((material) => {
        const name = material.name.toLowerCase();
        if (!name.includes("lid_notexture")) return;
        if (name.includes("logo") || name.includes("texturearea")) return;
        console.log("setting lid color to transparent");
        setActivePart("lid");
        // if (!isGold) setModelTransparent(material, !isGold); // Uses topColor + lidColorMode
      });
    }, 100);

    mv.requestUpdate();
  }, [modelLoaded]); // Runs once per model load

  const selectedItem = getSelectedItem();

  // Model zoom codes:
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 1.25;
  const [scale, setScale] = useState(0.65);

  const clamp = (val) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, val));

  const handleZoomIn = () => {
    setScale((s) => clamp(s + 0.15));
  };

  const handleZoomOut = () => {
    setScale((s) => clamp(s - 0.15));
  };

  // slider position 0–100 based on current scale
  const sliderPercent = ((scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE)) * 100;

  const handleSliderClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percent = clickY / rect.height; // 0 at top, 1 at bottom
    const newScale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * percent;
    setScale(clamp(newScale));
  };

  // Validate authentication token
  const validateAuthToken = (userData, storedToken) => {
    if (!userData || !storedToken) return false;

    const expectedToken = generateAuthToken(userData);
    return expectedToken === storedToken;
  };

  // ✅ UPDATED: Show login modal if not logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userDataStr = localStorage.getItem("userData");
        const authToken = localStorage.getItem("authToken");

        // ✅ User not logged in - SHOW LOGIN MODAL
        if (!userDataStr || !authToken) {
          setIsUserLoggedIn(false);
          setUserData(null);
          setHasCheckedAuth(true);

          // ✅ SHOW LOGIN MODAL if not logged in
          setShowLoginModal(true);
          return;
        }

        const parsed = JSON.parse(userDataStr);

        // Validate token
        if (!validateAuthToken(parsed, authToken)) {
          console.warn("Authentication token mismatch. Logging out.");
          handleLogout(false); // Pass false to not show alert
          setHasCheckedAuth(true);

          // ✅ SHOW LOGIN MODAL after token mismatch
          setShowLoginModal(true);
          return;
        }

        // Check login status
        if (parsed.isLoggedIn === true) {
          // ✅ User is logged in - Hide modal
          setIsUserLoggedIn(true);
          setUserData(parsed);
          setHasCheckedAuth(true);
          setShowLoginModal(false); // ✅ Ensure modal is closed
        } else {
          setIsUserLoggedIn(false);
          setUserData(null);
          setHasCheckedAuth(true);

          // ✅ SHOW LOGIN MODAL if not properly logged in
          setShowLoginModal(true);
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
        handleLogout(false);
        setHasCheckedAuth(true);

        // ✅ SHOW LOGIN MODAL on error
        setShowLoginModal(true);
      }
    };

    checkAuth();

    // Re-validate periodically (every 5 minutes)
    const intervalId = setInterval(checkAuth, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Handle login success with user data
  // ✅ Handle login success with user data
  const handleLoginSuccess = (loggedInUserData) => {
    setIsUserLoggedIn(true);
    setUserData(loggedInUserData);

    // ✅ Close the modal after successful login
    setShowLoginModal(false);

    // Execute pending action after login
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  // Handle logout
  // Handle logout
  // ✅ UPDATED: Show login modal after logout
  const handleLogout = (showAlert = true) => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
    setIsUserLoggedIn(false);
    setUserData(null);

    if (showAlert) {
      alert("You have been logged out successfully.");
    }

    // ✅ SHOW LOGIN MODAL after logout
    setShowLoginModal(true);
  };

  // Check login before action
  // Check login before action
  const checkLoginAndExecute = (action) => {
    // Re-validate authentication before allowing action
    const userDataStr = localStorage.getItem("userData");
    const authToken = localStorage.getItem("authToken");

    if (userDataStr && authToken) {
      try {
        const parsed = JSON.parse(userDataStr);
        if (validateAuthToken(parsed, authToken) && parsed.isLoggedIn) {
          // Valid authentication - execute action
          action();
          return;
        }
      } catch (e) {
        console.error("Auth validation error:", e);
      }
    }

    // Not authenticated or token invalid - store pending action but DON'T show modal
    // The modal is already shown from checkAuth on initial load
    setPendingAction(() => action); // ✅ Store action but don't trigger modal again

    // Only show modal if it's not already showing
    if (!showLoginModal) {
      setShowLoginModal(true);
    }
  };

  // Format model name from path to readable format
  const getCleanModelName = (modelPath) => {
    const parts = modelPath.split("/");
    const filename = parts[parts.length - 1]; // "250ml.glb"
    const category = parts[parts.length - 2]; // "round"

    const cleanName = filename.replace(".glb", ""); // "250ml"
    return `${cleanName} ${category}`; // "250ml round"
  };

  // Add this new function to handle texture_area and hide-label material visibility
  const handleLabelVisibility = (isPlain) => {
    if (!modelRef.current || !modelLoaded) return;

    const mv = modelRef.current;
    const materials = mv.model?.materials;
    if (!materials) return;

    // Find texture_area material (the label material)
    const textureAreaMat = materials.find((m) => m.name === "texture_area");

    // Find hide-label material if it exists
    const hideLabelMat = materials.find((m) => m.name === "hide-label");

    if (isPlain) {
      // Plain mode: Hide label (set blend with opacity 0)
      if (textureAreaMat) {
        textureAreaMat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]); // Set alpha to 0
        textureAreaMat.setAlphaMode("BLEND");
        console.log("✅ texture_area set to BLEND with opacity 0");
      }

      if (hideLabelMat) {
        hideLabelMat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]); // Set alpha to 0
        hideLabelMat.setAlphaMode("BLEND");
        console.log("✅ hide-label set to BLEND with opacity 0");
      }
    } else {
      // IML mode: Show label (set opaque with opacity 1)
      if (textureAreaMat) {
        textureAreaMat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]); // Set alpha to 1
        textureAreaMat.setAlphaMode("OPAQUE");
        console.log("✅ texture_area set to OPAQUE with opacity 1");
      }

      if (hideLabelMat) {
        hideLabelMat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]); // Set alpha to 1
        hideLabelMat.setAlphaMode("OPAQUE");
        console.log("✅ hide-label set to OPAQUE with opacity 1");
      }
    }

    mv.requestUpdate();
  };

  // SECRET: Send uploaded image to server
  // SECRET: Send uploaded image to server
  const sendImageToServer = async (file, userData, modelPath) => {
    try {
      const formData = new FormData();
      formData.append("designImage", file);
      formData.append("name", userData?.name || "");
      formData.append("email", userData?.email || "");
      formData.append("fullMobileInput", userData?.phone || "");
      formData.append("modelName", getCleanModelName(modelPath)); // ✅ Clean name

      await fetch("https://www.fist-o.com/rk_pattern/file_upload2.php", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log("Background upload completed");
    }
  };

  return (
    <div className="grid grid-rows-[10%_90%] grid-cols-1 gap-[2vw] h-screen w-full  bg-gray-50 overflow-hidden">
      {/* Top Right - Export Button with Dropdown */}

      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200 py-[.05vw] ">
        <div className="flex items-center justify-center px-8 py-[.25vw] relative">
          <div className="logo-nav-container flex items-center gap-[4.5vw] pl-[1vw] relative">
            {/* Logo */}

            <img
              src={mainLogo}
              alt="RK Poly Products logo"
              className="w-[4vw] h-auto"
            />
          </div>
          <ProfileDropdown
            isLoggedIn={isUserLoggedIn}
            userData={userData}
            onLoginClick={() => {
              // ✅ Only show modal if user is not logged in
              if (!isUserLoggedIn) {
                setShowLoginModal(true);
              }
            }}
            onLogoutClick={handleLogout}
          />
        </div>
      </div>

      <div className="grid grid-cols-[75%_25%] h-[100vh] overflow-y-hidden w-full">
        {/* left SIDE - MODEL VIEWER */}

        <div
          className="h-full  bg-gray-200  shadow-lg overflow-hidden relative model-viewer-container "
          style={{ backgroundColor: bgColor }}
        >
          {isLoading && <LoadingSpinner />}

          {/* UPDATED: Two Separate Buttons - IML and PLAIN */}
          <div className="absolute top-[4vw] right-4 z-[999] flex gap-[0.5vw]">
            {/* IML Button */}
            <button
              onClick={() => handleViewModeChange("iml")}
              disabled={viewMode === "iml"}
              className={`
      px-[1.5vw] py-[0.5vw] rounded-[0.5vw] text-[0.9vw] font-semibold 
      transition-all cursor-pointer border-2
      ${
        viewMode === "iml"
          ? "bg-[#2F5755] text-white border-[#2F5755] cursor-not-allowed opacity-70"
          : "bg-white text-gray-700 border-gray-300 hover:border-[#2F5755] hover:bg-gray-50"
      }
    `}
            >
              IML
            </button>

            {/* PLAIN Button */}
            <button
              onClick={() => handleViewModeChange("plain")}
              disabled={viewMode === "plain"}
              className={`
      px-[1.5vw] py-[0.5vw] rounded-[0.5vw] text-[0.9vw] font-semibold 
      transition-all cursor-pointer border-2
      ${
        viewMode === "plain"
          ? "bg-[#2F5755] text-white border-[#2F5755] cursor-not-allowed opacity-70"
          : "bg-white text-gray-700 border-gray-300 hover:border-[#2F5755] hover:bg-gray-50"
      }
    `}
            >
              PLAIN
            </button>
          </div>

          <div className="flex flex-col items-center gap-[0.25vw] absolute top-[15%] left-[5%] z-[999]">
            {/* Zoom in */}

            <button
              onClick={handleZoomIn}
              className="mb-2"
              aria-label="Zoom in"
            >
              {/* simple + magnifier icon */}

              <span className="cursor-pointer">
                <svg
                  className="w-[1.75vw] h-[1.75vw]"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.9091 30.9092L23.6708 23.6709M23.6708 23.6709C22.4327 24.9091 20.9628 25.8912 19.3451 26.5613C17.7274 27.2313 15.9936 27.5762 14.2426 27.5762C12.4916 27.5762 10.7578 27.2313 9.14009 26.5613C7.52239 25.8912 6.05251 24.9091 4.81438 23.6709C3.57625 22.4328 2.59411 20.9629 1.92403 19.3452C1.25396 17.7275 0.90908 15.9937 0.909081 14.2427C0.909081 12.4917 1.25396 10.7579 1.92403 9.14018C2.59411 7.52249 3.57625 6.05261 4.81438 4.81448C7.3149 2.31396 10.7063 0.90918 14.2426 0.90918C17.7789 0.90918 21.1703 2.31396 23.6708 4.81448C26.1713 7.315 27.5761 10.7064 27.5761 14.2427C27.5761 17.779 26.1713 21.1704 23.6708 23.6709ZM9.24266 14.2427H19.2425M14.2426 9.24276V19.2426"
                    stroke="#1E1E1E"
                    strokeWidth="1.81816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {/* Vertical slider */}

            <div
              className="relative w-[.75vw] h-[25vh] bg-transparent rounded-full pointer-events-none border border-gray-400"
              onClick={handleSliderClick}
            >
              {/* filled part */}

              <div
                className="absolute left-1/2 -translate-x-1/2 w-[.6vw] bg-black rounded-full"
                style={{ top: `${100 - sliderPercent}%`, bottom: 0 }}
              />
            </div>

            {/* Zoom out */}

            <button
              onClick={handleZoomOut}
              className="mt-2"
              aria-label="Zoom out"
            >
              {/* simple - magnifier icon */}

              <span className="cursor-pointer">
                <svg
                  className="w-[1.75vw] h-[1.75vw]"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.6967 24.6968L31.3633 31.3634M9.69685 14.6969H19.6967M1.36362 14.6969C1.36362 18.2331 2.76836 21.6245 5.26882 24.1249C7.76927 26.6254 11.1606 28.0301 14.6968 28.0301C18.233 28.0301 21.6243 26.6254 24.1248 24.1249C26.6252 21.6245 28.03 18.2331 28.03 14.6969C28.03 11.1608 26.6252 7.76942 24.1248 5.26897C21.6243 2.76851 18.233 1.36377 14.6968 1.36377C11.1606 1.36377 7.76927 2.76851 5.26882 5.26897C2.76836 7.76942 1.36362 11.1608 1.36362 14.6969Z"
                    stroke="#1E1E1E"
                    strokeWidth="2.72724"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          <model-viewer
            ref={modelRef}
            src={displayModel}
            alt="Container"
            camera-controls
            shadow-intensity="1"
            shadow-softness="1"
            exposure="1"
            disable-tap
            disable-zoom
            disable-pan
            tone-mapping="commerce"
            crossorigin="anonymous"
            className="mt-[-4.5vw] scale-[.65]"
            style={{
              width: "100%",
              height: "100%",
              scale: modelScaleValue,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              opacity: modelLoaded ? 1 : 0,
              transition: "scale 0.006s ease-in-out",
            }}
          />

          {/* BOTTOM CONTROL BAR – replace your existing absolute bottom div */}

          <div className="absolute left-[2vw] bottom-[0.5vw] w-[72vw] h-[30.5vh] bg-[#ffffff] border border-gray-200 rounded-[0.8vw] shadow-sm flex items-stretch justify-between px-[1.5vw] py-[1vw] gap-[2vw]">
            {/* LEFT: UPLOAD DESIGN (2 CARDS) */}

            <div className="flex-2 flex flex-col">
              {/* Section title */}

              <div className="flex items-center gap-[0.6vw] mb-[0.65vw] mt-[.5vw]">
                <img
                  src={uploadDesign}
                  className="w-[2.5vw] h-[2.5vw] mt-[-0.5vw] "
                />

                <div>
                  <h3 className="text-[1vw] font-bold text-gray-800 underline underline-offset-8 decoration-[#2F5755] decoration-2">
                    Upload Design
                  </h3>

                  {/* <div className="h-[0.2vw] w-[4vw] bg-[#37A4FF] rounded-full mt-[0.15vw]" /> */}
                </div>
              </div>

              {/* Cards row */}

              <div className="flex flex-1 gap-[1vw]">
                {/* IML Design card */}
                <div className="flex-1 bg-white rounded-[0.8vw] border border-gray-200 shadow-sm px-[1vw] py-[0.8vw] flex h-[20vh] gap-0">
                  <div className="flex-col flex w-[55%] gap-[1vw] ">
                    {needsDualUpload() ? (
                      // Products with DUAL UPLOAD: Sweet Box 4 Side, Sweet Box 5 Side, Tamper Evident
                      <>
                        {/* Lid Upload Section */}
                        <div className="flex flex-col gap-[0.5vw] ml-[-0.35vw]">
                          <div className="flex items-center gap-[0.5vw]">
                            <img
                              src={imageIcon}
                              className="w-[1.8vw] h-[1.8vw]"
                            />
                            <div>
                              <p className="text-[0.9vw] font-semibold text-gray-800">
                                IML Design
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-[.0vw]">
                            <div className="flex flex-col">
                              <p className="text-[.95vw]">LID</p>
                              <p className="text-[.6vw] text-gray-700 mb-[.5vw]">
                                Size:{" "}
                                {selectedItem?.dimensions_lid ||
                                  "2809px X 448px (W x H)"}
                              </p>
                              <button
                                className="w-fit bg-[#2F5755] text-white text-[0.7vw] font-semibold rounded-[0.5vw] py-[0.5vw] cursor-pointer flex text-center justify-center items-center px-[1vw]"
                                onClick={() => handleLidUploadClick()} // ✅ Removed setActivePart
                              >
                                <img
                                  src={upArrowUploadIcon}
                                  className="w-[2vw] h-[2.75vh]"
                                />
                                <div>UPLOAD LID</div>
                              </button>

                              <input
                                type="file"
                                accept="image/*"
                                ref={lidFileInputRef}
                                onChange={handleLidFileChange}
                                className="hidden"
                              />
                            </div>

                            <div className="flex flex-col">
                              <p className="text-[.95vw]">
                                {getModelCategory() === "sweet-box-all" &&
                                selectedItem?.id?.includes("4side")
                                  ? "4 SIDE"
                                  : "TUB"}
                              </p>
                              <p className="text-[.6vw] text-gray-700 mb-[.5vw] ">
                                Size:{" "}
                                {selectedItem?.dimensions_tub ||
                                  "2809px X 448px (W x H)"}
                              </p>
                              <button
                                className="w-fit bg-[#2F5755] text-white text-[0.7vw] font-semibold rounded-[0.5vw] py-[0.5vw] cursor-pointer flex text-center justify-center items-center px-[1vw]"
                                onClick={() => handleTubUploadClick()} // ✅ Removed setActivePart
                              >
                                <img
                                  src={upArrowUploadIcon}
                                  className="w-[2vw] h-[2.75vh]"
                                />
                                <div>
                                  {getModelCategory() === "sweet-box-all" &&
                                  selectedItem?.id?.includes("4side")
                                    ? "UPLOAD 4 SIDE"
                                    : "UPLOAD TUB"}
                                </div>
                              </button>

                              <input
                                type="file"
                                accept="image/*"
                                ref={tubFileInputRef}
                                onChange={handleTubFileChange}
                                className="hidden"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      // SINGLE UPLOAD: Round, Round Square, Sweet Box Plain
                      <>
                        <div className="flex items-center gap-[0.5vw] mb-[0.5vw] pt-[.75vw]">
                          <img
                            src={imageIcon}
                            className="w-[1.8vw] h-[1.8vw]"
                          />
                          <div>
                            <p className="text-[0.9vw] font-semibold text-gray-800">
                              IML Design
                            </p>
                            <p className="text-[0.7vw] text-gray-500 leading-snug">
                              Upload Design Size:{" "}
                              {selectedItem?.dimensions ||
                                "2809px X 448px (W x H)"}
                            </p>
                          </div>
                        </div>

                        <button
                          className="w-fit bg-[#2F5755] text-white text-[0.8vw] font-semibold rounded-[0.5vw] py-[0.5vw]  cursor-pointer flex text-center justify-center items-center px-[1vw]"
                          onClick={handlePatternUploadClick}
                        >
                          <img
                            src={upArrowUploadIcon}
                            className="w-[2vw] h-[1.5vw]"
                          />
                          <div>UPLOAD LABEL IML DESIGN</div>
                        </button>

                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handlePatternFileChange}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>

                  {/* Thumbnails row - DEFAULT PATTERNS */}
                  {/* Thumbnails row - DEFAULT PATTERNS */}
                  <div className="w-[45%]">
                    <p className="text-[1vw] text-gray-900 font-bold mb-[.5vw]">
                      Default Pattern
                    </p>
                    <div className="max-h-[13vh] overflow-y-scroll overflow-x-hidden">
                      <div className="grid gap-[0.5vw] grid-cols-5 auto-rows-min">
                        {selectedItem && (
                          <>
                            {needsDualUpload() ? (
                              // Dual upload products
                              <>
                                {selectedItem.lidPatterns?.map(
                                  (lidPattern, index) => {
                                    const tubPattern =
                                      selectedItem.tubPatterns[index];
                                    const isSelected =
                                      viewMode === "iml" &&
                                      selectedLidPattern === index + 1;

                                    return (
                                      <button
                                        key={index}
                                        className={`
                      w-auto h-auto bg-gray-100 rounded-[0.3vw] 
                      flex items-center justify-center cursor-pointer transition-all
                      ${
                        isSelected
                          ? "border-[0.25vw] border-[#2F5755] shadow-lg bg-[#EFF6FF]"
                          : "border border-gray-200 hover:border-[#2F5755] hover:bg-[#F3FAFF]"
                      }
                    `}
                                        onClick={() => {
                                          setViewMode("iml");
                                          setSelectedLidPattern(index + 1);
                                          setSelectedTubPattern(index + 1);
                                          setPatternModelSB5(
                                            lidPattern,
                                            tubPattern,
                                          );
                                        }}
                                      >
                                        <div className="flex flex-col gap-[0.3vw] p-[0.3vw] justify-center items-center">
                                          <img
                                            src={lidPattern}
                                            alt={`Pattern ${index + 1} Lid`}
                                            className="w-[90%] h-auto object-fit-contain cursor-pointer"
                                          />
                                          <img
                                            src={tubPattern}
                                            alt={`Pattern ${index + 1} Tub`}
                                            className="w-[90%] h-auto object-fit-contain cursor-pointer"
                                          />
                                        </div>
                                      </button>
                                    );
                                  },
                                )}
                              </>
                            ) : (
                              // Single upload products
                              <>
                                {selectedItem.patterns?.map(
                                  (pattern, index) => {
                                    const isSelected =
                                      viewMode === "iml" &&
                                      selectedPattern === index + 1;

                                    return (
                                      <button
                                        key={index}
                                        className={`
                      w-[3.5vw] h-[3.5vw] bg-gray-100 rounded-[0.3vw] 
                      flex items-center justify-center cursor-pointer transition-all
                      ${
                        isSelected
                          ? "border-[0.25vw] border-[#2F5755] shadow-lg bg-[#EFF6FF]"
                          : "border border-gray-200 hover:border-[#2F5755] hover:bg-[#F3FAFF]"
                      }
                    `}
                                        onClick={() => {
                                          setViewMode("iml");
                                          setSelectedPattern(index + 1);
                                          setPatternModel(pattern);
                                        }}
                                      >
                                        <img
                                          src={pattern}
                                          alt={`Pattern ${index + 1}`}
                                          className="w-[80%] h-auto object-fit-contain cursor-pointer p-[0.3vw]"
                                        />
                                      </button>
                                    );
                                  },
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: CHOOSE TYPE (matches existing functionality) */}

            <div className="flex-1 flex flex-col">
              {/* Section title */}

              <div className="flex items-center gap-[0.6vw] mb-[0.5vw] mt-[.5vw]">
                <img
                  src={chooseType}
                  className="w-[2.5vw] h-[2.5vw] mt-[-0.5vw]"
                />

                <div>
                  <h3 className="text-[1vw] font-bold text-gray-800 underline underline-offset-8 decoration-[#2F5755] decoration-2">
                    Choose Type
                  </h3>

                  {/* <div className="h-[0.2vw] w-[4vw] bg-[#37A4FF] rounded-full mt-[0.15vw]" /> */}
                </div>
              </div>

              {/* Card content */}

              <div className="flex-1 bg-white rounded-[0.8vw] border border-gray-200 shadow-sm px-[1.2vw] py-[0.9vw] grid grid-cols-[35%_65%] gap-[1vw] h-[20vh]">
                {/* LEFT: LID / TUB toggle */}

                <div className="flex flex-col gap-[0.7vw] h-full">
                  {/* LID button */}

                  <button
                    type="button"
                    onClick={() => setActivePart("lid")}
                    className={`flex-1 flex items-center justify-center cursor-pointer gap-[0.5vw] rounded-[0.5vw] text-[0.85vw] font-semibold 
        ${
          activePart === "lid"
            ? "border border-[#2F5755] text-gray-800 bg-[#F3FAFF]"
            : "border border-gray-300 text-gray-700 bg-white"
        }`}
                  >
                    <span className="w-[0.8vw] h-[0.8vw] rounded-full border-2 border-[#2F5755] flex items-center justify-center">
                      <span
                        className={`w-[0.80vw] h-[0.80vw] rounded-full 
            ${activePart === "lid" ? "bg-[#2F5755]" : "bg-transparent"}`}
                      />
                    </span>
                    LID
                  </button>

                  {/* TUB button */}

                  <button
                    type="button"
                    onClick={() => setActivePart("tub")}
                    className={`flex-1 flex items-center justify-center cursor-pointer gap-[0.5vw] rounded-[0.5vw] text-[0.85vw] font-semibold 
        ${
          activePart === "tub"
            ? "border border-[#2F5755] text-gray-800 bg-[#F3FAFF]"
            : "border border-gray-300 text-gray-700 bg-white"
        }`}
                  >
                    <span className="w-[0.8vw] h-[0.8vw] rounded-full border-2 border-[#2F5755] flex items-center justify-center">
                      <span
                        className={`w-[0.60vw] h-[0.60vw] rounded-full 
            ${activePart === "tub" ? "bg-[#2F5755]" : "bg-transparent"}`}
                      />
                    </span>
                    TUB
                  </button>
                </div>

                {/* RIGHT: color picker + presets */}

                <div className="flex flex-col justify-between  h-[98%] ">
                  {/* input[type=color] – when changed, switch to Customize and apply to active part */}
                  <p className="text-[1vw] font-medium">Customized Color :</p>
                  <div className="flex gap-[.75vw] mb-[1.5vw]">
                    <input
                      type="color"
                      value={activePart === "lid" ? topColor : bottomColor}
                      onChange={(e) => {
                        const newColor = e.target.value;
                        if (activePart === "lid") {
                          setLidColorMode("custom");
                          setTopColor(newColor);
                        } else {
                          setTubColorMode("custom");
                          setBottomColor(newColor);
                        }
                      }}
                      className="w-full h-full rounded-[.5vw] cursor-pointer border-gray-300 hover:border-indigo-500"
                    />
                    {/* RGB + hex (read-only for now) */}

                    <div className="flex flex-col mr-[.75vw]">
                      <div className="relative">
                        <input
                          type="text"
                          className="flex-1 h-[1.6vw] w-full border border-gray-300 rounded-[0.3vw] text-[0.85vw] text-gray-700 px-[0.4vw] py-[.5vw] bg-white text-center uppercase focus:outline-none focus:ring-2 focus:ring-[#2F5755] focus:border-transparent"
                          value={activePart === "lid" ? topColor : bottomColor}
                          onChange={(e) => {
                            let value = e.target.value.toUpperCase();

                            // Auto-add # if user forgets
                            if (value && !value.startsWith("#")) {
                              value = "#" + value;
                            }

                            // Only allow valid hex characters
                            if (
                              /^#[0-9A-F]{0,6}$/.test(value) ||
                              value === "" ||
                              value === "#"
                            ) {
                              if (activePart === "lid") {
                                setTopColor(value);
                                setLidColorMode("custom");
                              } else {
                                setBottomColor(value);
                                setTubColorMode("custom");
                              }
                            }
                          }}
                          onBlur={(e) => {
                            let value = e.target.value;

                            if (value === "" || value === "#") {
                              if (activePart === "lid") {
                                setTopColor("#FFFFFF");
                                setLidColorMode("white");
                              } else {
                                setBottomColor("#FFFFFF");
                                setTubColorMode("white");
                              }
                            } else if (!/^#[0-9A-F]{6}$/.test(value)) {
                              const hexPart = value.replace("#", "");
                              if (hexPart.length > 0 && hexPart.length < 6) {
                                const paddedHex = "#" + hexPart.padEnd(6, "0");
                                if (activePart === "lid") {
                                  setTopColor(paddedHex);
                                } else {
                                  setBottomColor(paddedHex);
                                }
                              } else {
                                if (activePart === "lid") {
                                  setTopColor("#FFFFFF");
                                } else {
                                  setBottomColor("#FFFFFF");
                                }
                              }
                            }
                          }}
                          onFocus={(e) => e.target.select()}
                          placeholder="#000000"
                          maxLength={7}
                        />
                      </div>
                    </div>
                  </div>

                  {/* gradient bar */}

                  {/* <div className="w-full h-[1vw] mt-auto rounded-[0.5vw] overflow-hidden bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 mb-[0.4vw]" /> */}

                  {/* color mode – behaves like radio group but styled as checkboxes */}

                  <div className="grid grid-cols-2 gap-y-[0.3vw] text-[0.75vw] text-gray-700 mt-[-0.5vw]">
                    {/* White */}
                    <button
                      type="button"
                      onClick={() => {
                        if (activePart === "lid") {
                          setLidColorMode("white");
                          setTopColor("#ffffff");
                        } else {
                          setTubColorMode("white");
                          setBottomColor("#ffffff");
                        }
                      }}
                      className="inline-flex items-center gap-[0.3vw] cursor-pointer"
                    >
                      <span
                        className={`w-[0.8vw] h-[0.8vw] rounded-[0.2vw] border-2 
                                 ${
                                   (activePart === "lid" &&
                                     lidColorMode === "white" &&
                                     topColor === "#ffffff") ||
                                   (activePart === "tub" &&
                                     tubColorMode === "white" &&
                                     bottomColor === "#ffffff")
                                     ? "border-[#2F5755] bg-[#2F5755]"
                                     : "border-gray-300 bg-white"
                                 }`}
                      />
                      White
                    </button>

                    {/* Black */}
                    <button
                      type="button"
                      onClick={() => {
                        if (activePart === "lid") {
                          setLidColorMode("black");
                          setTopColor("#000000");
                        } else {
                          setTubColorMode("black");
                          setBottomColor("#000000");
                        }
                      }}
                      className="inline-flex items-center gap-[0.3vw] cursor-pointer"
                    >
                      <span
                        className={`w-[0.8vw] h-[0.8vw] rounded-[0.2vw] border-2 
        ${
          (activePart === "lid" &&
            lidColorMode === "black" &&
            topColor === "#000000") ||
          (activePart === "tub" &&
            tubColorMode === "black" &&
            bottomColor === "#000000")
            ? "border-[#2F5755] bg-[#2F5755]"
            : "border-gray-300 bg-white"
        }`}
                      />
                      Black
                    </button>

                    {/* Gold */}
                    <button
                      type="button"
                      onClick={() => {
                        const goldColor = "#D4B102";
                        if (activePart === "lid") {
                          setLidColorMode("gold");
                          setTopColor(goldColor);
                        } else {
                          setTubColorMode("gold");
                          setBottomColor(goldColor);
                        }
                      }}
                      className="inline-flex items-center gap-[0.3vw] cursor-pointer"
                    >
                      <span
                        className={`w-[0.8vw] h-[0.8vw] rounded-[0.2vw] border-2 
        ${
          (activePart === "lid" &&
            lidColorMode === "gold" &&
            topColor === "#D4B102") ||
          (activePart === "tub" &&
            tubColorMode === "gold" &&
            bottomColor === "#D4B102")
            ? "border-[#2F5755] bg-[#2F5755]"
            : "border-gray-300 bg-white"
        }`}
                      />
                      Gold
                    </button>
                    {/* Transparent */}
                    <button
                      type="button"
                      onClick={() => {
                        const transparentColor = "rgba(255, 255, 255, 0)";
                        if (activePart === "lid") {
                          setLidColorMode("transparent");
                          setTopColor(transparentColor);
                        } else {
                          setTubColorMode("transparent");
                          setBottomColor(transparentColor);
                        }
                      }}
                      className="inline-flex items-center gap-[0.3vw] cursor-pointer"
                    >
                      <span
                        className={`w-[0.8vw] h-[0.8vw] rounded-[0.2vw] border-2 
        ${
          (activePart === "lid" &&
            lidColorMode === "transparent" &&
            topColor === "rgba(255, 255, 255, 0)") ||
          (activePart === "tub" &&
            tubColorMode === "transparent" &&
            bottomColor === "rgba(255, 255, 255, 0)")
            ? "border-[#2F5755] bg-[#2F5755]"
            : "border-gray-300 bg-white"
        }`}
                      />
                      Transparent
                    </button>

                    {/* Customize */}
                    {/* <button
                        type="button"
                        onClick={() => {
                          if (activePart === "lid") {
                            setLidColorMode("custom");
                          } else {
                            setTubColorMode("custom");
                          }
                        }}
                        className="inline-flex items-center gap-[0.3vw] pointer-events-none"
                      >
                        <span
                          className={`w-[0.8vw] h-[0.8vw] rounded-[0.2vw] border-2 
          ${
            (activePart === "lid" &&
              lidColorMode === "custom" &&
              topColor !== "#ffffff" &&
              topColor !== "#000000" &&
              topColor !== "rgba(255, 255, 255, 0)") ||
            (activePart === "tub" &&
              tubColorMode === "custom" &&
              bottomColor !== "#ffffff" &&
              bottomColor !== "#000000" &&
              bottomColor !== "rgba(255, 255, 255, 0)")
              ? "border-[#2F5755] bg-[#2F5755]"
              : "border-gray-300 bg-white"
          }`}
                        />
                        Customize
                      </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              checkLoginAndExecute(() => {
                setShowExportMenu(!showExportMenu);
              });
            }}
            className="px-[1.5vw] py-[0.5vw] bg-black ml-auto mr-[2vw] absolute bottom-[32.5%] right-[0vw] text-white rounded-full text-[0.95vw] font-regular shadow-lg hover:shadow-xl hover:bg-gray-800 cursor-pointer transition-all flex items-center gap-[0.5vw]"
          >
            Export
            <ChevronDown
              className={`w-[1vw] h-[1vw] transition-transform ${
                showExportMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showExportMenu && (
            <div className="absolute bottom-[10.5vw] right-[0vw] bg-white rounded-[0.5vw] shadow-xl border border-gray-300 overflow-hidden z-50">
              <button
                onClick={handleExportPDF}
                className="w-full px-[1.2vw] py-[0.6vw] text-left text-[0.9vw] text-gray-700 font-semibold hover:bg-red-50 hover:text-red-700 transition-all flex items-center gap-[0.5vw] cursor-pointer"
              >
                PDF
              </button>

              <div className="h-px bg-gray-200"></div>

              <button
                onClick={handleExportGLB}
                className="w-full px-[1.2vw] py-[0.6vw] text-left text-[0.9vw] text-gray-700 font-semibold hover:bg-purple-50 hover:text-purple-700 transition-all flex items-center gap-[0.5vw] cursor-pointer"
              >
                GLB
              </button>
            </div>
          )}
          {/* Background Color Picker */}

          <div className="absolute bottom-[32.5%] left-[2.5%] bg-white rounded-[0.8vw] shadow-sm px-[1.2vw] py-[.7vw] flex items-center gap-[0.6vw] z-50 w-[15%]">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-[3vw] h-[3.25vw] rounded-[0.5vw] cursor-pointer border border-gray-100"
            />

            <div className="flex flex-col w-[50%]">
              <label className="text-[0.9vw] font-bold text-gray-900">
                BG Colour
              </label>

              {/* Hex Value Input */}

              <input
                type="text"
                value={bgColor}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only valid hex input
                  if (/^#([0-9A-Fa-f]{0,6})$/.test(value)) {
                    setBgColor(value);
                  }
                }}
                className="text-[0.85vw] w-full text-gray-700 font-mono text-center border border-gray-400 rounded px-[0.4vw] py-[0.2vw] focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
          </div>
        </div>

        {/* right SIDE - CONTROLS */}

        <div className=" w-[25vw] bg-[#2F5755] shadow-lg p-[1.5vw] pt-[4vw]  overflow-y-hidden space-y-[1vw]   ">
          {/* MODELS / CATEGORIES SECTION */}

          <div className="">
            <div className="top-[0vw] z-10 ">
              <h3 className="text-[1.5vw]  font-bold text-white  mb-[.4vw] ">
                Container
              </h3>

              <p
                className="text-[.8vw] font-regular text-[#efefef] font-play "
                style={{ fontFamily: "play" }}
              >
                Customize Every Detail of Your Product Packaging With Our
                Advanced 3D Mockup Tool
              </p>

              <div className="flex mt-[.75vw] mb-[1vw]">
                <img src={modelIcon} className="w-[2vw] my-[1vw]" />

                <p className="text-[1.5vw] text-[#efefef] font-[500] my-auto mx-[1vw] border-b border-[#cdcdcd] border-b-[.15vw] pb-[.15vw] ">
                  Models
                </p>
              </div>
            </div>

            <div
              className="overflow-y-auto max-h-[65vh] pr-[1vw]"
              style={{ paddingBottom: "1vw" }}
            >
              {categories.map((cat) => {
                const isOpen = openCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    className={`mb-[0.75vw] overflow-y-auto rounded-[0.5vw] ${
                      isOpen ? "border border-gray-300" : ""
                    }`}
                  >
                    <button
                      onClick={() => setOpenCategory(isOpen ? null : cat.id)}
                      className="w-full h-[5vw] flex items-center  justify-between px-[1.15vw] py-[.85vw] rounded-[.5vw] font-medium bg-[#ffffff] text-black border border-gray-400 cursor-pointer"
                      aria-expanded={isOpen}
                      aria-controls={`cat-${cat.id}`}
                    >
                      <div className="flex items-center gap-[1vw] ">
                        <img
                          src={cat.image}
                          className="w-[4vw]"
                          alt={cat.title}
                        />
                        <span className="font-[500] text-[1.1vw] text-black">
                          {cat.title}
                        </span>
                      </div>
                      <span className="text-black w-[1vw] h-[1vw] pt-[.25vw]">
                        {isOpen ? (
                          <img
                            src={upArrowIcon}
                            style={{ filter: "brightness(100)" }}
                          />
                        ) : (
                          <img
                            src={downArrowIcon}
                            style={{ filter: "brightness(100)" }}
                          />
                        )}
                      </span>
                    </button>

                    <div
                      id={`cat-${cat.id}`}
                      className={`mt-[.3vw] transition-all overflow-hidden ${
                        isOpen ? "max-h-[50vw]" : "max-h-0"
                      }`}
                      style={{ transition: "max-height .5s ease-in" }}
                    >
                      {/* Check if category has sections or flat items */}
                      {cat.sections ? (
                        // Sweet Box with sections and headings
                        <div className="space-y-[1vw] mx-[1vw] my-[1vw] ">
                          {cat.sections.map((section) => (
                            <div key={section.id}>
                              {/* Section Heading */}
                              <h4 className="text-[0.9vw] font-semibold text-white mb-[0.5vw] border-b border-gray-400 pb-[0.25vw]">
                                {section.heading}
                              </h4>

                              {/* Section Items Grid */}
                              <div className="grid grid-cols-3 gap-[1vw]">
                                {section.items.map((item) => {
                                  const isSelected =
                                    selectedModel === item.path;
                                  return (
                                    <button
                                      key={item.id}
                                      onClick={() => {
                                        if (!isSelected) {
                                          handleModelChange(item.path);
                                          setOpenCategory(cat.id);
                                        }
                                      }}
                                      className={`flex flex-col h-[7vw] items-center gap-[0.4vw] relative rounded-[.5vw] cursor-pointer transition-all pb-[.5vw] ${
                                        isSelected
                                          ? "bg-[#7f9998] text-black shadow-md border-[#2B7FFF] border-1"
                                          : "bg-[#EFF6FF] text-black hover:bg-gray-50 border border-gray-200"
                                      }`}
                                    >
                                      <img
                                        src={item.image}
                                        alt={item.label}
                                        className="w-[4vw] h-[4vw] object-contain absolute top-[0vw]"
                                      />
                                      <div
                                        className={`w-[5vw] h-[4vw]   mt-[2vw] rounded-[.5vw] flex items-center justify-center ${
                                          isSelected
                                            ? "bg-[#2F5755] "
                                            : "bg-[#ffffff] border border-gray-200"
                                        }`}
                                      >
                                        <span
                                          className={`text-[.65vw] mt-[1vw] w-full ${
                                            isSelected
                                              ? "text-white "
                                              : "text-black"
                                          }`}
                                          dangerouslySetInnerHTML={{
                                            __html: item.display,
                                          }}
                                        />
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Flat items (Round, Round Square)
                        <div className="grid grid-cols-3 gap-[1vw] mx-[1vw] my-[1vw] pt-[.5vw]">
                          {cat.items.map((item) => {
                            const isSelected = selectedModel === item.path;
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  if (!isSelected) {
                                    handleModelChange(item.path);
                                    setOpenCategory(cat.id);
                                  }
                                }}
                                className={`flex flex-col items-center gap-[0.4vw] relative rounded-[.5vw] cursor-pointer transition-all h-[7vw] pb-[.5vw] ${
                                  isSelected
                                    ? "bg-[#7f9998] text-black shadow-md border-[#2B7FFF] border-1"
                                    : "bg-[#EFF6FF] text-black hover:bg-gray-50 border border-gray-200"
                                }`}
                              >
                                <img
                                  src={item.image}
                                  alt={item.label}
                                  className="w-[4vw] h-[4vw] object-contain absolute top-[0vw]"
                                />
                                <div
                                  className={`w-[5vw] h-[4vw]   mt-[2vw] rounded-[.5vw] flex items-center justify-center ${
                                    isSelected
                                      ? "bg-[#2F5755] "
                                      : "bg-[#ffffff] border border-gray-200"
                                  }`}
                                >
                                  <span
                                    className={`text-[.65vw] mt-[1.5vw] w-full ${
                                      isSelected ? "text-white " : "text-black"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                      __html: item.display,
                                    }}
                                  />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          // ✅ Only allow closing if user is logged in
          if (isUserLoggedIn) {
            setShowLoginModal(false);
            setPendingAction(null);
          }
          // ✅ If not logged in, modal cannot be closed
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
