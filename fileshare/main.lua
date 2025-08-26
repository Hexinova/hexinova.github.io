local Library = loadstring(game:HttpGet("https://raw.githubusercontent.com/xHeptc/Kavo-UI-Library/main/source.lua"))()

local Window = Library.CreateLib("ZSCRIPT", "DarkTheme")

--[tabs]--

local HomeTab = Window:NewTab("Home")

local MainTab = Window:NewTab("Main")


local PlayerTab = Window:NewTab("Player")

--[sections]--

local HomeSection = HomeTab:NewSection("Home")

local MainSection = MainTab:NewSection("Main")

local PlayerSection = PlayerTab:NewSection("Player")

--[dropdowns]--


--[sliders]--

PlayerSection:NewSlider("Walkspeed", "Changes your Walkspeed", 1600, 16, function(v)
    game.Players.LocalPlayer.Character.Humanoid.WalkSpeed = v
end)

PlayerSection:NewSlider("Jumppower", "Changes your Jumppower", 5000, 50, function(v)
    game.Players.LocalPlayer.Character.Humanoid.JumpPower = v
end)


--[labels]--

local WelcomeLabel = HomeSection:NewLabel("Welcome, "..game.Players.LocalPlayer.DisplayName..", enjoy using ZSCRIPT!")

--[textboxes]--

PlayerSection:NewTextBox("Custom Walkspeed", "Changes your walkspeed.", function(v)
	local v = tonumber(v)

    if v then
        game.Players.LocalPlayer.Character.Humanoid.WalkSpeed = v
    end
end)

PlayerSection:NewTextBox("Custom Jumppower", "Changes your jumpower.", function(v)
	local v = tonumber(v)

    if v then
        game.Players.LocalPlayer.Character.Humanoid.JumpPower = v
    end
end)