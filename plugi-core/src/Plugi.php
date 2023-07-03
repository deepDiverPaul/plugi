<?php

namespace Plugi;

use DirectoryIterator;
use Plugi\Contracts\AuthContract;
use Plugi\Contracts\PageContract;
use Plugi\Contracts\PageTranslationContract;
use Plugi\Contracts\WebsiteManagerContract;
use Plugi\Contracts\PageBuilderContract;
use Plugi\Contracts\RouterContract;
use Plugi\Contracts\ThemeContract;
use Plugi\Modules\GrapesJS\PageRenderer;
use Plugi\Repositories\UploadRepository;
use Plugi\Core\DB;
use Plugi\Extensions;

class Plugi
{
    /**
     * @var AuthContract $auth
     */
    protected $auth;

    /**
     * @var WebsiteManagerContract $websiteManager
     */
    protected $websiteManager;

    /**
     * @var PageBuilderContract $pageBuilder
     */
    protected $pageBuilder;

    /**
     * @var RouterContract $router
     */
    protected $router;

    /**
     * @var ThemeContract $theme
     */
    protected $theme;

    /**
     * Plugi constructor.
     *
     * @param array|null $config         configuration in the format defined in config/config.example.php
     */
    public function __construct($config = [])
    {
        // do nothing if no config is provided (e.g. during composer install)
        if (empty($config)) {
            return;
        }

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // if flash session data is set, set global session flash data and remove data
        if (isset($_SESSION['phpb_flash'])) {
            global $phpb_flash;
            $phpb_flash = $_SESSION['phpb_flash'];
            unset($_SESSION['phpb_flash']);
        }

        $this->setConfig($config);

        // load extensions
        $this->loadExtensions();

        // create database connection, if enabled
        if (phpb_config('storage.use_database')) {
            $this->setDatabaseConnection(phpb_config('storage.database'));
            $this->checkDatabaseDefinition();
            $this->hydrateConfig();
        }

        // init the default authentication, if enabled
        if (phpb_config('auth.use_login')) {
            $this->auth = phpb_instance('auth');
        }

        // init the default website manager, if enabled
        if (phpb_config('website_manager.use_website_manager')) {
            $this->websiteManager = phpb_instance('website_manager');
        }

        // init the default page builder, active theme and page router
        $this->pageBuilder = phpb_instance('pagebuilder');

        $this->theme = phpb_instance('theme', [
            phpb_config('theme'),
            phpb_config('theme.active_theme')
        ]);

        $this->router = phpb_instance('router');

        // load translations in the language that is currently active
        $this->loadTranslations(phpb_current_language());
    }

    /**
     * Load translations of the given language into a global variable.
     *
     * @param $language
     * @return array
     */
    public function loadTranslations($language)
    {
        global $phpb_translations;

        $phpbLanguageFile = __DIR__ . '/../lang/' . $language . '.php';
        if (! file_exists($phpbLanguageFile)) {
            $phpbLanguageFile = __DIR__ . '/../lang/en.php';
        }
        $phpb_translations = require $phpbLanguageFile;

        // load default and current language translations of the current theme
        $themeTranslationsFolder = phpb_config('theme.folder') . '/' . phpb_config('theme.active_theme') . '/translations';
        if (file_exists($themeTranslationsFolder . '/en.php')) {
            $phpb_translations = array_merge($phpb_translations, require $themeTranslationsFolder . '/en.php');
        }
        if (file_exists($themeTranslationsFolder . '/' . $language . '.php')) {
            $phpb_translations = array_merge($phpb_translations, require $themeTranslationsFolder . '/' . $language . '.php');
        }
        return $phpb_translations;
    }

    /**
     * Load extensions into a global variable.
     *
     * @return void
     */
    public function loadExtensions()
    {
        if (file_exists('extensions') && is_dir('extensions')) {
            $extensionsDirectory = new DirectoryIterator('extensions');
            foreach ($extensionsDirectory as $entry) {
                $extFolder = $entry->getFilename();
                $extensionFile = 'extensions/' . $extFolder . '/extension.php';
                $configFile = 'extensions/'    . $extFolder . '/config.php';
                if ($entry->isDir() && ! $entry->isDot() && file_exists($extensionFile) && file_exists($configFile)) {
                    require $extensionFile;
                    $extConfig = include($configFile);
                    $extKey = $extConfig['identifier'];
                    Extensions::registerConfig($extKey, $extConfig);
                    if(array_key_exists('assets', $extConfig) && is_array($extConfig['assets'])){
                        foreach ($extConfig['assets'] as $asset) {
                            Extensions::registerAsset(
                                '/extensions/'.$extFolder.$asset['src'],
                                $asset['type'],
                                $asset['location'],
                            );
                        }
                    }
                    if(array_key_exists('settings', $extConfig) && is_array($extConfig['settings'])){
                        Extensions::addSettings(array_map(function ($setting) use($extKey){
                            $setting['key'] = 'ext--' . $extKey . '--' . $setting['name'];
                            return $setting;
                        }, $extConfig['settings']));
                    }
                }

            }
        }
    }

    /**
     * Set the Plugi configuration to the given array.
     *
     * @param array $config
     */
    public function setConfig(array $config)
    {
        global $phpb_config;
        $phpb_config = $config;

    }

    /**
     * Set the Plugi database connection using the given array.
     *
     * @param array $config
     */
    public function setDatabaseConnection(array $config)
    {
        global $phpb_db;
        global $phpb_config;
        $phpb_db = new DB($config);
        $theme = Setting::get('selected_theme');
        if ($theme) $phpb_config['theme']['active_theme'] = $theme;
        $language = Setting::get('admin_language');
        if ($language) $phpb_config['general']['language'] = $language;
    }

    /**
     * Set the Plugi database connection using the given array.
     *
     * @param array $config
     */
    public function hydrateConfig()
    {
        global $phpb_config;
        $theme = Setting::get('selected_theme');
        if ($theme) $phpb_config['theme']['active_theme'] = $theme;
        $language = Setting::get('admin_language');
        if ($language) $phpb_config['general']['language'] = $language;
    }

    /**
     * Set the Plugi database connection using the given array.
     *
     * @param array $config
     */
    public function checkDatabaseDefinition()
    {
        global $phpb_db;
        if (Setting::get('db-definition') !== $phpb_db->getDBDefinitionHash()) {
            $module = 'website_manager';
            $parameters = [
                ['tab' => 'info'],
                ['route' => 'database', 'action' => 'update']
            ];
            if(!phpb_on_url($module, $parameters[0])) {
                if(!phpb_on_url($module, $parameters[1])) {
                    phpb_redirect(phpb_url($module, $parameters[0]), [
                        'message-type' => 'error',
                        'message' => phpb_trans('website-manager.check-database')
                    ]);
                }
            }
        }
    }

    /**
     * Set a custom auth.
     *
     * @param AuthContract $auth
     */
    public function setAuth(AuthContract $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Set a custom website manager.
     *
     * @param WebsiteManagerContract $websiteManager
     */
    public function setWebsiteManager(WebsiteManagerContract $websiteManager)
    {
        $this->websiteManager = $websiteManager;
    }

    /**
     * Set a custom PageBuilder.
     *
     * @param PageBuilderContract $pageBuilder
     */
    public function setPageBuilder(PageBuilderContract $pageBuilder)
    {
        $this->pageBuilder = $pageBuilder;
    }

    /**
     * Set a custom router.
     *
     * @param RouterContract $router
     */
    public function setRouter(RouterContract $router)
    {
        $this->router = $router;
    }

    /**
     * Set a custom theme.
     *
     * @param ThemeContract $theme
     */
    public function setTheme(ThemeContract $theme)
    {
        $this->theme = $theme;
        if (isset($this->pageBuilder)) {
            $this->pageBuilder->setTheme($theme);
        }
    }


    /**
     * Return the Auth instance of this Plugi.
     *
     * @return AuthContract
     */
    public function getAuth()
    {
        return $this->auth;
    }

    /**
     * Return the WebsiteManager instance of this Plugi.
     *
     * @return WebsiteManagerContract
     */
    public function getWebsiteManager()
    {
        return $this->websiteManager;
    }

    /**
     * Return the PageBuilder instance of this Plugi.
     *
     * @return PageBuilderContract
     */
    public function getPageBuilder()
    {
        return $this->pageBuilder;
    }

    /**
     * Return the Router instance of this Plugi.
     *
     * @return RouterContract
     */
    public function getRouter()
    {
        return $this->router;
    }

    /**
     * Return the Theme instance of this Plugi.
     *
     * @return ThemeContract
     */
    public function getTheme()
    {
        return $this->theme;
    }


    /**
     * Process the current GET or POST request and redirect or render the requested page.
     *
     * @param string|null $action
     * @return bool
     */
    public function handleRequest($action = null)
    {
        $route = $route ?? $_GET['route'] ?? null;
        $action = $action ?? $_GET['action'] ?? null;
        if (! phpb_config('auth.use_login') || ! phpb_config('website_manager.use_website_manager')) {
            die('The Plugi Authentication module is disabled, but no alternative has been implemented (you are still calling the standard handleRequest() method).<br>'
                . 'Implement a piece of code that checks whether the user is logged in. If logged in, call handleAuthenticatedRequest() or else call handlePublicRequest().');
        }

        // handle login and logout requests
        $this->auth->handleRequest($action);

        // handle website manager requests
        if (phpb_in_module('website_manager')) {
            $this->auth->requireAuth();
            $this->websiteManager->handleRequest($route, $action);
            header("HTTP/1.1 404 Not Found");
            die('Plugi WebsiteManager page not found');
        }

        // handle page builder requests
        if (phpb_in_module('pagebuilder')) {
            $this->auth->requireAuth();
            phpb_set_in_editmode();
            $this->pageBuilder->handleRequest($route, $action);
            header("HTTP/1.1 404 Not Found");
            die('Plugi PageBuilder page not found');
        }

        // handle all requests that do not need authentication
        if ($this->handlePublicRequest()) {
            return true;
        }

        if (phpb_current_relative_url() === '/') {
            $this->websiteManager->renderWelcomePage();
            return true;
        }
        header("HTTP/1.1 404 Not Found");
        $message = 'Plugi page not found. Check your URL: <b>' . phpb_e(phpb_full_url(phpb_current_relative_url())) . '</b>';
        $errorPage = __DIR__ . '/../..' . phpb_config('theme.folder_url') . '/' . phpb_config('theme.active_theme') . '/pages/404.php';
        if (file_exists($errorPage)) $message = include $errorPage;
        die($message);
    }

    /**
     * Handle public requests, allowed without any authentication.
     *
     * @return bool
     */
    public function handlePublicRequest()
    {
        // if we are on the URL of an upload, return uploaded file
        // (note: this is a fallback option used if .htaccess does not whitelist direct access to the /uploads folder.
        // allowing direct /uploads access via .htaccess is preferred since it gives faster loading time)
        if (strpos(phpb_current_relative_url(), phpb_config('general.uploads_url') . '/') === 0) {
            $this->handleUploadedFileRequest();
            header("HTTP/1.1 404 Not Found");
            exit();
        }
        // if we are on the URL of a Plugi asset, return the asset
        if (strpos(phpb_current_relative_url(), phpb_config('general.assets_url') . '/') === 0) {
            $this->handlePageBuilderAssetRequest();
            header("HTTP/1.1 404 Not Found");
            exit();
        }

        // try to find page in cache
        $cache = phpb_instance('cache');
        if (phpb_config('cache.enabled') &&
            ! isset($_GET['ignore_cache']) &&
            ! isset($_GET['refresh_cache']) &&
            ! isset($_COOKIE['ignore_cache']) &&
            PageRenderer::canBeCached()
        ) {
            $cachedContent = $cache->getForUrl(phpb_current_relative_url());
            if ($cachedContent) {
                echo $cachedContent;
                return true;
            }
        }

        if(Extensions::getRoute(phpb_current_relative_url())){
            $ext = include Extensions::getRoutes()[phpb_current_relative_url()];
            if($ext !== 'continue'){
                return true;
            }
        }

        // let the page router resolve the current URL
        $page = null;
        $pageTranslation = $this->resolvePageLanguageVariantFromUrl(phpb_current_relative_url());
        if ($pageTranslation) {
            $page = $pageTranslation->getPage();
        }
        // if the URL cannot be resolved, but the lowercase version of the URL can be resolved, redirect to the lowercase URL
        if (($page->logic ?? '') === 'page-not-found' && phpb_current_relative_url() !== strtolower(phpb_current_relative_url())) {
            $pageLowerCaseUrlTranslation = $this->resolvePageLanguageVariantFromUrl(strtolower(phpb_current_relative_url()));
            if ($pageLowerCaseUrlTranslation) {
                $pageLowerCaseUrl = $pageLowerCaseUrlTranslation->getPage();
                if (($pageLowerCaseUrl->logic ?? '') !== 'page-not-found') {
                    header("HTTP/1.1 301 Moved Permanently");
                    header("Location: " . strtolower(phpb_current_relative_url()));
                    exit();
                }
            }
        }
        // render page if resolved
        if ($page) {
            $renderedContent = $this->pageBuilder->renderPage($page, $pageTranslation->locale);
            if (strpos($pageTranslation->route, '/*') === false) {
                $this->cacheRenderedPage($renderedContent);
            }
            echo $renderedContent;
            return true;
        }
        return false;
    }

    /**
     * Resolve a PageTranslation from the given URL.
     *
     * @param $url
     * @return PageTranslationContract|null
     */
    protected function resolvePageLanguageVariantFromUrl($url)
    {
        $pageTranslation = $this->router->resolve($url);
        if ($pageTranslation instanceof PageTranslationContract) {
            return $pageTranslation;
        }
        return null;
    }

    /**
     * Cache the rendered page contents, if caching is enabled and the current page does not contain non-cacheable blocks.
     *
     * @param string $renderedContent
     */
    protected function cacheRenderedPage(string $renderedContent)
    {
        if (! phpb_config('cache.enabled') || ! PageRenderer::canBeCached() || isset($_GET['ignore_cache'])) {
            return;
        }

        // allow a forced cached page refresh, stored for the current URL but without the refresh parameter
        $url = phpb_current_relative_url();
        $url = str_replace('?refresh_cache&', '?', $url);
        $url = str_replace('?refresh_cache', '', $url);
        $url = str_replace('&refresh_cache', '', $url);

        $cache = phpb_instance('cache');
        $cache->storeForUrl($url, $renderedContent, phpb_static(PageRenderer::class)::getCacheLifetime());
    }

    /**
     * Handle authenticated requests, this method assumes you have checked that the user is currently logged in.
     *
     * @param string|null $route
     * @param string|null $action
     */
    public function handleAuthenticatedRequest($route = null, $action = null)
    {
        $route = $route ?? $_GET['route'] ?? null;
        $action = $action ?? $_GET['action'] ?? null;

        // handle website manager requests
        if (phpb_config('website_manager.use_website_manager') && phpb_in_module('website_manager')) {
            $this->websiteManager->handleRequest($route, $action);
            header("HTTP/1.1 404 Not Found");
            exit();
        }

        // handle page builder requests
        if (phpb_in_module('pagebuilder')) {
            phpb_set_in_editmode();
            $this->pageBuilder->handleRequest($route, $action);
            header("HTTP/1.1 404 Not Found");
            exit();
        }
    }

    /**
     * Handle uploaded file requests.
     */
    public function handleUploadedFileRequest()
    {
        // get the requested file by stripping the configured uploads_url prefix from the current request URI
        $file = substr(phpb_current_relative_url(), strlen(phpb_config('general.uploads_url')) + 1);
        // $file is in the format {file id}/{file name}.{file extension}, so get file id as the part before /
        $fileId = explode('/', $file)[0];
        if (empty($fileId)) {
            header("HTTP/1.1 404 Not Found");
            exit();
        }

        $uploadRepository = new UploadRepository;
        $uploadedFile = $uploadRepository->findWhere('public_id', $fileId);
        if (! $uploadedFile) {
            header("HTTP/1.1 404 Not Found");
            exit();
        }

        $uploadedFile = $uploadedFile[0];
        $serverFile = realpath(phpb_config('storage.uploads_folder') . '/' . $uploadedFile->server_file);
        // add backwards compatibility for files uploaded with Plugi <= v0.12.0, stored as /uploads/{id}.{extension}
        if (! $serverFile) $serverFile = realpath(phpb_config('storage.uploads_folder') . '/' . basename($uploadedFile->server_file));
        if (! $serverFile) {
            header("HTTP/1.1 404 Not Found");
            exit();
        }

        header('Content-Type: ' . $uploadedFile->mime_type);
        header('Content-Disposition: inline; filename="' . basename($uploadedFile->original_file) . '"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Content-Length: ' . filesize($serverFile));

        readfile($serverFile);
        exit();
    }

    /**
     * Handle page builder asset requests.
     */
    public function handlePageBuilderAssetRequest()
    {
        // get asset file path by stripping the configured assets_url prefix from the current request URI
        $asset = substr(phpb_current_relative_url(), strlen(phpb_config('general.assets_url')) + 1);
        $asset = explode('?', $asset)[0];

        $distPath = realpath(__DIR__ . '/../dist/');
        $requestedFile = realpath($distPath . '/' . $asset);
        if (! $requestedFile) {
            header("HTTP/1.1 404 Not Found");
            exit();
        }

        // prevent path traversal by ensuring the requested file is inside the dist folder
        if (strpos($requestedFile, $distPath) !== 0) {
            header("HTTP/1.1 404 Not Found");
            exit();
        }

        // only allow specific extensions
        $ext = pathinfo($requestedFile, PATHINFO_EXTENSION);
        if (! in_array($ext, ['js', 'css', 'jpg', 'png', 'svg'])) {
            header("HTTP/1.1 404 Not Found");
            exit();
        }

        $contentTypes = [
            'js' => 'application/javascript; charset=utf-8',
            'css' => 'text/css; charset=utf-8',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'svg' => 'image/svg+xml'
        ];
        header('Content-Type: ' . $contentTypes[$ext]);
        header('Content-Disposition: inline; filename="' . basename($requestedFile) . '"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Content-Length: ' . filesize($requestedFile));

        readfile($requestedFile);
        exit();
    }


    /**
     * Render the PageBuilder.
     *
     * @param PageContract $page
     */
    public function renderPageBuilder(PageContract $page)
    {
        phpb_set_in_editmode();
        $this->pageBuilder->renderPageBuilder($page);
    }
}
