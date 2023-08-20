<?php

namespace Plugi;

class Extensions
{

    /**
     * Routes that can be added by plugins / composer packages.
     */
    protected static $settings = [];

    /**
     * Extension-Configs that can be added by plugins / composer packages.
     */
    protected static $configs = [];

    /**
     * Extension-Configs that can be added by plugins / composer packages.
     */
    protected static $backends = [];

    /**
     * Routes that can be added by plugins / composer packages.
     */
    protected static $routes = [];

    /**
     * Blocks that can be added by plugins / composer packages.
     */
    protected static $blocks = [];

    /**
     * Layouts that can be added by plugins / composer packages.
     */
    protected static $layouts = [];

    protected static $assets = [
        'header' => [],
        'footer' => [],
        'admin-header' => [],
        'admin-footer' => [],
    ];

    protected static $htmlBlocks = [
        'head' => [],
        'body-start' => [],
        'body-end' => [],
        'admin-head' => [],
        'admin-body-start' => [],
        'admin-body-end' => [],
    ];

    /**
     * Register an asset.
     * @param string $src
     * @param string $type
     * @param string $location
     * @param array['$key' => '$value'] $attributes
     */
    public static function registerAsset(string $src, string $type, string $location = 'header', array $attributes = []) {
        self::$assets[$location][] = [
            'src' => $src,
            'type' => $type,
            'attributes' => $attributes
        ];
    }

    /**
     * Register an HtmlBlock.
     * @param string $html
     * @param string $location
     */
    public static function registerHtmlBlock(string $html, string $location = 'head') {
        self::$htmlBlocks[$location][] = $html;
    }

    /**
     * Register a single extension-config.
     * @param string $slug
     * @param array $config
     * @return void
     */
    public static function registerConfig(string $slug, array $config) {
        self::$configs[$slug] = $config;
    }

    /**
     * Register a single extension-config.
     * @param string $slug
     * @param array $backend
     * @return void
     */
    public static function registerBackend(string $slug, array $backend) {
        $backend['icon'] = $backend['icon'] ?: '<i class="ph ph-circles-three-plus"></i>';
        self::$backends['ext--'.$slug] = $backend;
    }

    /**
     * Register a single route.
     * @param string $slug
     * @param string $includePath
     * @return void
     */
    public static function registerRoute(string $slug, string $includePath) {
        self::$routes[$slug] = $includePath;
    }

    /**
     * Register multiple routes at once.
     * @param array['$slug' => '$includePath'] $routes
     * @return void
     */

    public static function addRoutes(array $routes) {
        self::$routes = array_merge(self::$routes, $routes);
    }

    /**
     * Register multiple settings at once.
     * @param array $settings
     * @return void
     */

    public static function addSettings(array $settings) {
        self::$settings = array_merge(self::$settings, $settings);
    }

    /**
     * Register a single block.
     * @param string $slug
     * @param string $directoryPath
     */
    public static function registerBlock(string $slug, string $directoryPath) {
        self::$blocks[$slug] = $directoryPath;
    }

    /**
     * Register a single layout.
     * @param string $slug
     * @param string $directoryPath
     */
    public static function registerLayout(string $slug, string $directoryPath) {
        self::$layouts[$slug] = $directoryPath;
    }

    /**
     * Register multiple blocks at once.
     * @param array['$slug' => '$directoryPath'] $blocks
     */

    public static function addBlocks(array $blocks) {
        self::$blocks = array_merge(self::$blocks, $blocks);
    }

    /**
     * Register multiple blocks at once.
     * @param array['$slug' => '$directoryPath'] $layouts
     */
    public static function addLayouts(array $layouts) {
        self::$layouts = array_merge(self::$layouts, $layouts);
    }

    /**
     * Get all routes.
     */
    public static function getRoutes() : array {
        return self::$routes;
    }

    /**
     * Get all settings.
     */
    public static function getSettings($ext = null) : array {
        $settingIns = phpb_instance('setting');
        $hydrSettings = [];
        foreach (self::$settings as $setting) {
            if($ext !== null && !str_starts_with($setting['key'], 'ext--'.$ext.'--')){
                continue;
            }
            $setting['value'] = $settingIns::get($setting['key']) ?: $setting['default'];
            $hydrSettings[$setting['name']] = $setting;
        }
        return $hydrSettings;
    }

    /**
     * Get all blocks.
     */
    public static function getBlocks() : array {
        return self::$blocks;
    }

    /**
     * Get all layouts.
     */
    public static function getLayouts() : array {
        return self::$layouts;
    }

    /**
     * Get all backends.
     */
    public static function getBackends() : array {
        return self::$backends;
    }

    /**
     * Get a single extension Config.
     */
    public static function getConfig(string $id) {
        return self::$configs[$id] ?? null;
    }

    /**
     * Get all extension Configs.
     */
    public static function getConfigs() {
        return self::$configs;
    }

    /**
     * Get a single route.
     */
    public static function getRoute(string $id) {
        return self::$routes[$id] ?? null;
    }

    /**
     * Get a single block.
     */
    public static function getBlock(string $id) {
        return self::$blocks[$id] ?? null;
    }

    /**
     * Get a single layout.
     */
    public static function getLayout(string $id) {
        return self::$layouts[$id] ?? null;
    }

    /**
     * Get all header assets.
     */
    public static function getHtmlBlocks(string $location = 'head'): string
    {
        return implode('', self::$htmlBlocks[$location]);
    }

    /**
     * Get all header assets.
     */
    public static function getHeaderAssets(): array
    {
        return self::$assets['header'];
    }

    /**
     * Get all footer assets.
     */
    public static function getFooterAssets() {
        return self::$assets['footer'];
    }

    /**
     * Get all admin header assets.
     */
    public static function getAdminHeaderAssets() {
        return self::$assets['admin-header'];
    }

    /**
     * Get all admin footer assets.
     */
    public static function getAdminFooterAssets() {
        return self::$assets['admin-footer'];
    }
}
